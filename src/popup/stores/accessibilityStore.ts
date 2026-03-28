import {defineStore} from "pinia";
import {UnwrapRef} from "vue";
import {S} from "tailwindcss/dist/types-CJYAW1ql";
import {useAccessibilityHandler} from "../../browser/accessibilityHandler.ts";

export const updateDocumentClasses = (state: IAccessibilityStoreState) => {
    const root = document.documentElement;
    if (state.fontDyslexic) {
        root.classList.add("accessibility-font-dyslexic");
    } else {
        root.classList.remove("accessibility-font-dyslexic");
    }

    if (state.fontBolded) {
        root.classList.add("accessibility-font-bolded");
    } else {
        root.classList.remove("accessibility-font-bolded");
    }

    if (state.fontScale != 100) {
        const root = document.documentElement;
        if (!root.hasAttribute("data-accessibility-processed")) {
            root.setAttribute("data-accessibility-original-font", root.style.fontSize ?? '');
            preprocessElementFonts();
        }

        root.style.fontSize = `${state.fontScale}%`;
    } else {
        root.style.fontSize = root.getAttribute("data-accessibility-original-font");
    }
}

export const preprocessElementFonts = () => {
    const root = document.documentElement;
    if (root.hasAttribute("data-accessibility-processed")) {
        return;
    }

    const baseFontSizePx = parseFloat(window.getComputedStyle(root).fontSize);
    const allElements = document.querySelectorAll('body *');

    allElements.forEach(el => {
        // Skip tags that shouldn't have text scaling applied
        if (['SCRIPT', 'STYLE', 'SVG', 'PATH', 'IMG', 'CANVAS'].includes(el.tagName)) return;

        const computedPx = parseFloat(window.getComputedStyle(el).fontSize);
        if (!isNaN(computedPx)) {
            const remValue = computedPx / baseFontSizePx;
            el.style.fontSize = `${remValue}rem !important`;
        }
    });

    root.setAttribute("data-accessibility-processed", true)
}

export const useAccessibilityStore = defineStore('accessibilityStore', {
    state: (): IAccessibilityStoreState => ({
        fontScale: 100,
        fontBolded: false,
        fontDyslexic: false,
        storeLoaded: false
    }),
    getters: {
        async loadAccessibilityState() {
            if (this.storeLoaded) {
                return;
            }

            const accessibilityHandler = useAccessibilityHandler();
            const settings = await accessibilityHandler.getPersistedState();
            console.log(settings);
            this.fontScale = settings.fontScale ?? 100;
            this.fontBolded = settings.fontBolded ?? false;
            this.fontDyslexic = settings.fontDyslexic ?? false;

            this.storeLoaded = true;
        }
    },
    actions: {
        reset() {
            this.fontScale = 100;
            this.fontBolded = false;
            this.fontDyslexic = false;
        },
    }
})