import {useAccessibilityHandler} from "./browser/accessibilityHandler.ts";
import {MessageType} from "./browser/MessageType.ts";
import {BrowserType} from "./utilities/browserType.ts";

chrome.runtime.onMessage.addListener(async (message, _, sendResponse) => {
    const browserType: BrowserType = message.browserType;
    const accessibilityHandler = useAccessibilityHandler(browserType);
    switch (message.type) {
        case MessageType.GET_ACCESSIBILITY_SETTINGS: {
            const settings = await accessibilityHandler.getPersistedState();
            sendResponse(settings);
        } break;
    }

    return true;
});