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
