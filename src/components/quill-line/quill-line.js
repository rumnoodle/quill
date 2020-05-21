export default class QuillLine extends HTMLElement {
  constructor() {
    super();
    this.caret = null;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    this.line = this.shadowRoot.getElementById("line");
  }

  handleInput(key) {
    const beforeCaret = this.shadowRoot.getElementById("before-caret");
    beforeCaret.textContent += key;
  }

  setCaret(caret) {
    const beforeCaret = document.createElement("div");
    beforeCaret.id = "before-caret";
    const afterCaret = document.createElement("div");
    afterCaret.id = "after-caret";

    this.line.insertBefore(afterCaret, this.line.firstChild);
    this.line.insertBefore(caret, this.line.firstChild);
    this.line.insertBefore(beforeCaret, this.line.firstChild);
  }
}

if (!customElements.get("quill-line")) {
  customElements.define("quill-line", QuillLine);
}
