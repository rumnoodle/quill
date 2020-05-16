import QuillBuffer from "./quill-buffer-component.js";
import QuillManager from "./quill-manager-component.js";
import QuillStatusBar from "./quill-status-bar-component.js";

export default class QuillEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";
  }
}

if (!customElements.get("quill-editor")) {
  customElements.define("quill-editor", QuillEditor);
}
