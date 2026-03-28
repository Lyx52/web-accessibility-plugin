import {IAccessibilityFeature} from "../interfaces/IAccessibilityFeature.ts";

export class TextToSpeechFeature implements IAccessibilityFeature {
    languageDetector: any|null = null;
    enabled: boolean = false;
    private static instance: TextToSpeechFeature|null = null;

    public static getInstance(): IAccessibilityFeature {
        if (!TextToSpeechFeature.instance) {
            TextToSpeechFeature.instance = new TextToSpeechFeature();
            TextToSpeechFeature.instance.initialize();
        }

        return TextToSpeechFeature.instance as IAccessibilityFeature;
    }

    public enable(): void {
        this.enabled = true;
    }

    public disable() {
        this.enabled = false;
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
    }

    public initialize() {
        const handler = async (e: any) => {
            await this.speak(e.target);
        };
        document.addEventListener("click", handler, true);
    }

    getDocumentLanguage(): string {
        const root = document.documentElement;
        return root.lang ?? 'en-US';
    }

    getFullLanguageCode(language: string|null|undefined): string|null|undefined {
        const mapping: Record<string, string> = {
            lv: 'lv-LV',
            en: 'en-US',
            zh: 'zh-TW',
            ru: 'ru-RU',
            de: 'de-DE',
            fr: 'fr-FR',
            es: 'es-ES',
        };

        if (!language) {
            return language;
        }

        return mapping[language] ?? null;
    }

    async detectLanguage(text: string): Promise<string> {
        const windowSelf: any = window
        if (!windowSelf.LanguageDetector) {
            return this.getDocumentLanguage();
        }

        if (await windowSelf.LanguageDetector.availability()) {
            this.languageDetector = await windowSelf.LanguageDetector.create();
        }

        if (this.languageDetector) {
            const results = await this.languageDetector.detect(text) ?? [];
            const result = results.shift();

            return this.getFullLanguageCode(result?.detectedLanguage) ?? 'en-US';
        }

        return this.getDocumentLanguage();
    }
    cleanTextForSpeech(text: string|null|undefined): string {
        if (!text) return "";

        return text
            .replace(/\p{Extended_Pictographic}/gu, '')
            .replace(/[\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '')
            .replace(/(https?:\/\/[^\s]+)/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    getElementText(element: HTMLElement|null, depth = 3): string {
        if (!element) {
            return '';
        }

        const ariaHidden = Boolean(element.getAttribute('aria-hidden'));
        let text = element.getAttribute('aria-label') ?? element.textContent;
        if ((!text || ariaHidden) && depth > 0) {
            return this.getElementText(element.parentElement, --depth);
        }

        return text;
    }

    async speak(element: HTMLElement) {
        if (!this.enabled) {
            return;
        }

        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }
        const text = this.getElementText(element);
        const language = await this.detectLanguage(text);
        const cleanedText = this.cleanTextForSpeech(text);
        if (cleanedText?.length <= 0) {
            return;
        }

        const utterance = new SpeechSynthesisUtterance(`  ${cleanedText}`);
        utterance.lang = language;
        await speechSynthesis.speak(utterance);
    }
}