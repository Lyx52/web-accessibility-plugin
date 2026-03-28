export interface IAccessibilityPageHandler {
    initialize(): Promise<void>;
    loadInitialSettings(): void;
}