import {MessageType} from "../MessageType.ts";

export interface IAccessibilityHandler {
    getPersistedState(): Promise<IAccessibilityStoreState|null>;
    persist(state: IAccessibilityStoreState): Promise<void>;
    updateAccessibilityOnPage(state: IAccessibilityStoreState): Promise<void>;
    sendMessage(messageType: MessageType, data: any): Promise<void>;
}