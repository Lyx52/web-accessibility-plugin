import {MessageType} from "../MessageType.ts";
import {IAccessibilityHandler} from "../interfaces/IAccessibilityHandler.ts";

export class ChromiumAccessibilityHandler implements IAccessibilityHandler {
    public ACCESSIBILITY_SETTINGS: string = 'accessibilitySettings';
    public async sendMessage(messageType: MessageType, data: any) {
        const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!activeTab?.id) {
            return;
        }

        await chrome.tabs.sendMessage(activeTab!.id, {
            type: messageType,
            data: data,
        });
    }

    public async updateAccessibilityOnPage(state: IAccessibilityStoreState): Promise<void> {
        await this.sendMessage(MessageType.ACCESSIBILITY_SETTINGS_UPDATE, state);
    }

    public async persist(state: IAccessibilityStoreState): Promise<void> {
        const value = JSON.stringify(state);
        await chrome.storage.local.set({ [this.ACCESSIBILITY_SETTINGS]: value });

    }

    public async getPersistedState(): Promise<IAccessibilityStoreState|null> {
        const result = await chrome.storage.local.get(this.ACCESSIBILITY_SETTINGS);
        try {
            return JSON.parse(result[this.ACCESSIBILITY_SETTINGS] as string)
        } catch {
            return null;
        }
    }
}