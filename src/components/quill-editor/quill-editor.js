import QuillBuffer from "./quill-buffer-component.js";
import QuillManager from "./quill-manager-component.js";
import QuillActionBar from "./quill-action-bar-component.js";
import QuillStatusBar from "./quill-status-bar-component.js";

import EventHandler from "../../src/event-handler.js";

export default class QuillEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    this.domMap = {
      quillEditor: this.shadowRoot.getRootNode(),
      quillBuffer: this.shadowRoot.getElementById("quill-buffer").shadowRoot,
      quillManager: this.shadowRoot.getElementById("quill-manager").shadowRoot,
      quillManager: this.shadowRoot.getElementById("quill-status-bar")
        .shadowRoot,
      quillManager: this.shadowRoot.getElementById("quill-action-bar")
        .shadowRoot,
    };

    const eventHandler = new EventHandler(this.domMap);
  }
}

if (!customElements.get("quill-editor")) {
  customElements.define("quill-editor", QuillEditor);
}
