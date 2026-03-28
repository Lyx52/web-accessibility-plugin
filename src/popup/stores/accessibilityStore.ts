import {defineStore} from "pinia";
import {useAccessibilityHandler} from "../../browser/accessibilityHandler.ts";
import {TextToSpeechFeature} from "./features/TextToSpeechFeature.ts";

export const updateDocumentClasses = (state: IAccessibilityStoreState, maxFontSize: number = 300) => {
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

    if (state.lineHeight) {
        root.classList.add("accessibility-line-height");
    } else {
        root.classList.remove("accessibility-line-height");
    }

    if (state.letterSpacing) {
        root.classList.add("accessibility-letter-spacing");
    } else {
        root.classList.remove("accessibility-letter-spacing");
    }

    if (state.bigCursor) {
        root.classList.add("accessibility-big-cursor");
    } else {
        root.classList.remove("accessibility-big-cursor");
    }

    if (state.speech) {
        TextToSpeechFeature.getInstance().enable()
    } else {
        TextToSpeechFeature.getInstance().disable()
    }

    if (state.fontScale != 100) {
        const root = document.documentElement;
        if (!root.hasAttribute("data-accessibility-processed")) {
            root.setAttribute("data-accessibility-original-font", root.style.fontSize ?? '');
            preprocessElementFonts();
        }

        root.style.fontSize = `${Math.min(maxFontSize, state.fontScale)}%`;
    } else {
        root.style.fontSize = root.getAttribute("data-accessibility-original-font") ?? '';
    }
}

export const preprocessElementFonts = () => {
    const root = document.documentElement;
    if (root.hasAttribute("data-accessibility-processed")) {
        return;
    }

    const baseFontSizePx = parseFloat(window.getComputedStyle(root).fontSize);
    const allElements = document.querySelectorAll('body *');

    allElements.forEach((el) => {
        const elem: HTMLElement = el as HTMLElement;
        // Skip tags that shouldn't have text scaling applied
        if (['SCRIPT', 'STYLE', 'SVG', 'PATH', 'IMG', 'CANVAS'].includes(elem.tagName)) return;

        const computedPx = parseFloat(window.getComputedStyle(elem).fontSize);
        if (!isNaN(computedPx)) {
            const remValue = computedPx / baseFontSizePx;
            elem.style.fontSize = `${remValue}rem !important`;
        }
    });

    root.setAttribute("data-accessibility-processed", 'true')
}

export const useAccessibilityStore = defineStore('accessibilityStore', {
    state: (): IAccessibilityStoreState => ({
        fontScale: 100,
        fontBolded: false,
        fontDyslexic: false,
        lineHeight: false,
        letterSpacing: false,
        bigCursor: false,
        storeLoaded: false,
        speech: false,
    }),
    actions: {
        async loadAccessibilityState() {
            if (this.storeLoaded) {
                return;
            }

            const accessibilityHandler = useAccessibilityHandler();
            const settings = await accessibilityHandler.getPersistedState();

            this.fontScale = settings?.fontScale ?? 100;
            this.fontBolded = settings?.fontBolded ?? false;
            this.fontDyslexic = settings?.fontDyslexic ?? false;
            this.lineHeight = settings?.lineHeight ?? false;
            this.letterSpacing = settings?.letterSpacing ?? false;
            this.bigCursor = settings?.bigCursor ?? false;
            this.speech = settings?.speech ?? false;

            this.storeLoaded = true;
        },
        reset() {
            this.fontScale = 100;
            this.fontBolded = false;
            this.fontDyslexic = false;
            this.lineHeight = false;
            this.letterSpacing = false;
            this.bigCursor = false;
            this.speech = false;
        },
    }
})