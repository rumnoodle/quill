export default class QuillLine extends HTMLElement {
  constructor(content) {
    super();
    this.caret = null;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    this.line = this.shadowRoot.getElementById("line");
    if (content) {
      this.line.textContent = content;
    }
  }

  handleInput(key) {
    const beforeCaret = this.shadowRoot.getElementById("before-caret");
    beforeCaret.textContent += key;
  }

  setCaret(caret) {
    this.caret = caret;
    const beforeCaret = document.createElement("div");
    beforeCaret.id = "before-caret";
    const afterCaret = document.createElement("div");
    afterCaret.id = "after-caret";

    if (this.line.textContent.length > 0) {
      this.caret.setCharacter(this.line.textContent.charAt(0));
      afterCaret.textContent = this.line.textContent.substring(1);
      this.line.textContent = "";
    }

    this.line.insertBefore(afterCaret, this.line.firstChild);
    this.line.insertBefore(this.caret, this.line.firstChild);
    this.line.insertBefore(beforeCaret, this.line.firstChild);
  }

  getCaret() {
    return this.caret;
  }

  unsetCaret() {
    this.caret = null;
  }

  splitAtCaret() {
    const afterCaret = this.shadowRoot.getElementById("after-caret");
    const content = this.caret.getCharacter() + afterCaret.textContent;
    const beforeCaret = this.shadowRoot.getElementById("before-caret");
    this.line.textContent = beforeCaret.textContent;
    this.unsetCaret();
    return content;
  }

  moveCaretLeft(step) {
    const afterCaret = this.shadowRoot.getElementById("after-caret");
    const beforeCaret = this.shadowRoot.getElementById("before-caret");
    const beforeTextLength = beforeCaret.textContent.length;

    if (step === "character" && beforeTextLength > 0) {
      afterCaret.textContent =
        this.caret.getCharacter() + afterCaret.textContent;

      this.caret.setCharacter(
        beforeCaret.textContent.charAt(beforeTextLength - 1)
      );

      beforeCaret.textContent = beforeCaret.textContent.substring(
        0,
        beforeTextLength - 1
      );
    }
  }

  moveCaretRight(step) {
    const beforeCaret = this.shadowRoot.getElementById("before-caret");
    const afterCaret = this.shadowRoot.getElementById("after-caret");
    const afterTextLength = afterCaret.textContent.length;

    if (step === "character" && afterTextLength > 0) {
      beforeCaret.textContent += this.caret.getCharacter();
      this.caret.setCharacter(afterCaret.textContent.charAt(0));
      afterCaret.textContent = afterCaret.textContent.substring(1);
    } else if (afterTextLength === 0 && this.caret.getCharacter() !== "") {
      beforeCaret.textContent += this.caret.getCharacter();
      this.caret.setCharacter("");
    }
  }
}

if (!customElements.get("quill-line")) {
  customElements.define("quill-line", QuillLine);
}
