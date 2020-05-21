import QuillLine from "./quill-line-component.js";
import QuillCaret from "./quill-caret-component.js";
import EventBroker from "../event-broker.js";

export default class QuillBuffer extends HTMLElement {
  constructor() {
    super();
    this.active = true;
    this.file = "";
    this.currentLine = new QuillLine();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    this.editArea = this.shadowRoot.getElementById("editable");
    this.editArea.appendChild(this.currentLine);

    EventBroker.registerListener("mode", (name) => {
      this.active = name === "default" ? true : false;
    });

    EventBroker.registerListener("input", (key) => {
      this.handleInput(key);
    });

    EventBroker.registerListener("move", (action) => {
      this.handleMove(action);
    });

    EventBroker.registerListener("fileContentFetched", (lines) => {
      this.loadContent(lines);
    });
  }

  handleInput(key) {
    if (this.active) {
      if (key === "Enter") {
        const caret = this.currentLine.getCaret();
        const content = this.currentLine.splitAtCaret();
        const newLine = new QuillLine(content);

        newLine.setCaret(caret);
        this.editArea.insertBefore(newLine, this.currentLine.nextSibling);
        this.currentLine = newLine;
      } else {
        this.currentLine.handleInput(key);
      }
    }
  }

  handleMove(action) {
    if (this.active) {
      switch (action.direction) {
        case "left":
          this.currentLine.moveCaretLeft(action.step);
          break;
        case "right":
          this.currentLine.moveCaretRight(action.step);
          break;
      }
    }
  }

  setCaret(caret) {
    this.currentLine.setCaret(caret);
  }

  loadContent({ file, content }) {
    this.editArea.innerHTML = "";
    this.currentLine = null;
    this.file = file;
    content.forEach((line) => {
      console.log(line);
      const newLine = new QuillLine(line);
      this.editArea.appendChild(newLine);

      if (!this.currentLine) {
        this.currentLine = newLine;
        this.currentLine.setCaret(new QuillCaret());
      }
    });
  }
}

if (!customElements.get("quill-buffer")) {
  customElements.define("quill-buffer", QuillBuffer);
}
