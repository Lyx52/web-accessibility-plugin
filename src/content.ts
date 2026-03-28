import './css/accessibility.css';
import {useAccessibilityPageHandler} from "./browser/accessibilityPageHandler.ts";
const pageHandler = useAccessibilityPageHandler();

(async () => {
    await pageHandler.initialize();
})();
