export default class QuillManager extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";
  }

  //   static thisCustomFunction() {
  //     return { quillManager: this.shadowRoot };
  //   }
}

if (!customElements.get("quill-manager")) {
  customElements.define("quill-manager", QuillManager);
}
