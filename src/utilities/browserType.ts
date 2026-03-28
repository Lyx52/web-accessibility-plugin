export enum BrowserType {
    CHROMIUM = "CHROMIUM",
    FIREFOX = "FIREFOX",
    UNKNOWN = "UNKNOWN"
}

export const getBrowserType = (): BrowserType => {
    if (typeof (window as any).browser !== "undefined" && navigator.userAgent.includes("Firefox")) {
        return BrowserType.FIREFOX;
    }

    if (typeof (window as any).chrome !== "undefined") {
        return BrowserType.CHROMIUM;
    }

    return BrowserType.UNKNOWN;
};