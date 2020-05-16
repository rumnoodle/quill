export default class QuillManager extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";
  }
}

if (!customElements.get("quill-manager")) {
  customElements.define("quill-manager", QuillManager);
}
