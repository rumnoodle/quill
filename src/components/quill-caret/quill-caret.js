export default class QuillCaret extends HTMLElement {
  constructor() {
    super();
    this.character = "";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";
  }

  setCharacter(character) {
    this.character = character;
    const caret = this.shadowRoot.getElementById("quill-caret");
    caret.textContent = character;
  }

  getCharacter() {
    return this.character;
  }
}

if (!customElements.get("quill-caret")) {
  customElements.define("quill-caret", QuillCaret);
}
