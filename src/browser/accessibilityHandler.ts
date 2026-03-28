import {getBrowserType} from "../utilities/browserType.ts";
import {ChromiumAccessibilityHandler} from "./chrome/chromiumAccessibilityHandler.ts";
import { BrowserType } from "../utilities/browserType.ts";
import {IAccessibilityHandler} from "./interfaces/IAccessibilityHandler.ts";

export const useAccessibilityHandler = (browserType: BrowserType|null = null): IAccessibilityHandler => {
    switch (browserType ?? getBrowserType()) {
        case BrowserType.CHROMIUM: return new ChromiumAccessibilityHandler();
        default: throw new Error("Not supported browser type");
    }
}