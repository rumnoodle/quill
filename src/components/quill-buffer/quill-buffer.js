import EventBroker from "../event-broker.js";

export default class QuillBuffer extends HTMLElement {
  constructor() {
    super();
    this.caret = null;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    this.editArea = this.shadowRoot.getElementById("editable");
    this.lines = this.editArea.getElementsByClassName("line");

    EventBroker.registerListener("input", (key) => {
      this.handleInput(key);
    });
  }

  handleInput(key) {
    const preCaret = this.shadowRoot.getElementById("pre-caret");
    preCaret.textContent += key;
  }

  setCaret(caret) {
    this.caret = caret;

    const preCaret = document.createElement("div");
    preCaret.id = "pre-caret";
    const postCaret = document.createElement("div");
    postCaret.id = "pre-caret";

    const firstLine = this.lines[0];
    firstLine.appendChild(preCaret);
    firstLine.appendChild(caret);
    firstLine.appendChild(postCaret);
  }
}

if (!customElements.get("quill-buffer")) {
  customElements.define("quill-buffer", QuillBuffer);
}
