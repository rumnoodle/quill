export default class QuillStatusBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";
  }
}

if (!customElements.get("quill-status-bar")) {
  customElements.define("quill-status-bar", QuillStatusBar);
}
