import QuillBuffer from "./quill-buffer-component.js";
import EventBroker from "../event-broker.js";

export default class QuillEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    this.buffer = new QuillBuffer();
    this.shadowRoot.appendChild(this.buffer);
  }

  getFilePath() {
    return this.buffer.getFilePath();
  }

  getContent() {
    const lines = this.buffer.getContentAsLines();
    return lines.join("\n");
  }
}

if (!customElements.get("quill-editor")) {
  customElements.define("quill-editor", QuillEditor);
}
