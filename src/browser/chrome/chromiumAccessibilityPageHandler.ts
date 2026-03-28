import {IAccessibilityPageHandler} from "../interfaces/IAccessibilityPageHandler.ts";
import {updateDocumentClasses} from "../../popup/stores/accessibilityStore.ts";
import {MessageType} from "../MessageType.ts";
import {getBrowserType} from "../../utilities/browserType.ts";

export class ChromiumAccessibilityPageHandler implements IAccessibilityPageHandler {
    initialize(): Promise<void> {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            switch (message.type) {
                case MessageType.ACCESSIBILITY_SETTINGS_UPDATE: updateDocumentClasses(message.data);
            }

            return true;
        });
        this.loadInitialSettings();

        console.log("AccessibilityPageHandler initialized");
    }
    loadInitialSettings(): void {
        chrome.runtime.sendMessage({ type: MessageType.GET_ACCESSIBILITY_SETTINGS, browserType: getBrowserType() }, (response) => {
            if (response) {
                updateDocumentClasses(response);
            }
        });
    }
}