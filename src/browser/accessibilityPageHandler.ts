import {getBrowserType} from "../utilities/browserType.ts";
import { BrowserType } from "../utilities/browserType.ts";
import {IAccessibilityPageHandler} from "./interfaces/IAccessibilityPageHandler.ts";
import {ChromiumAccessibilityPageHandler} from "./chrome/chromiumAccessibilityPageHandler.ts";

export const useAccessibilityPageHandler = (): IAccessibilityPageHandler => {
    const browserType = getBrowserType();
    switch (browserType) {
        case BrowserType.CHROMIUM: return new ChromiumAccessibilityPageHandler();
        default: throw new Error("Not supported browser type");
    }
}