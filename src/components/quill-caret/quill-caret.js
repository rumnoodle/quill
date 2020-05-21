export default class QuillCaret extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";
  }
}

if (!customElements.get("quill-caret")) {
  customElements.define("quill-caret", QuillCaret);
}
