import QuillLine from "./quill-line-component.js";
import EventBroker from "../event-broker.js";

export default class QuillBuffer extends HTMLElement {
  constructor() {
    super();
    this.lines = [];
    this.currentLine = new QuillLine();
    this.lines.push(this.currentLine);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    this.editArea = this.shadowRoot.getElementById("editable");
    this.editArea.appendChild(this.currentLine);

    EventBroker.registerListener("input", (key) => {
      this.handleInput(key);
    });
  }

  handleInput(key) {
    this.currentLine.handleInput(key);
  }

  setCaret(caret) {
    this.currentLine.setCaret(caret);
  }
}

if (!customElements.get("quill-buffer")) {
  customElements.define("quill-buffer", QuillBuffer);
}
