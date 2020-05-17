export default class QuillActionBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";
  }
}

if (!customElements.get("quill-action-bar")) {
  customElements.define("quill-action-bar", QuillActionBar);
}
