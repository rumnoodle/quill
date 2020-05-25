import QuillLine from "./quill-line-component.js";
import Selection from "../selection.js";
import EventBroker from "../event-broker.js";

export default class QuillBuffer extends HTMLElement {
  constructor() {
    super();
    this.active = true;
    this.file = "";
    this.lines = [];
    const line = new QuillLine();
    this.lines.push(line);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    this.editArea = this.shadowRoot.getElementById("editable");
    this.editArea.appendChild(line);

    this.selection = new Selection();
    line.setSelection(this.selection.start.column, this.selection.end.column);

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

  getFilePath() {
    return this.file;
  }

  getContentAsLines() {
    return this.lines.map((line) => {
      return line.getText();
    });
  }

  setSelection() {
    let currentLine = this.selection.start.line;
    const endLine = this.selection.end.line;

    // refactor this but to get it working again
    this.lines.forEach((line) => {
      line.removeSelection();
    });

    // note, this won't work on multiline selections, the end column needs to be set to entire line in all but the last line and
    // the start column needs to be set to 0 in all but the first.
    while (currentLine <= endLine) {
      this.lines[currentLine].setSelection(
        this.selection.start.column,
        this.selection.end.column
      );
      currentLine++;
    }
  }

  handleInput(key) {
    const inputPosition = this.selection.inputPosition();
    if (this.active) {
      if (key === "Enter") {
        // do something
      } else {
        this.lines[inputPosition.line].insert(key, inputPosition.column);
        this.selection.bumpSelection(0, 1);
        this.setSelection();
      }
    }
  }

  handleMove(action) {
    if (this.active) {
      switch (action.direction) {
        case "left":
          // do something
          break;
        case "right":
          if (
            this.lines[this.selection.start.line].length() <
            this.selection.start.column + 1
          ) {
            if (this.lines[this.selection.start.line] !== undefined) {
              this.selection.wrapLine(1);
            }
          } else {
            this.selection.bumpSelection(0, 1);
          }
          break;
      }
      // console.log(this.selection.start);
      // console.log(this.selection.end);
      this.setSelection();
    }
  }

  loadContent({ file, content }) {
    this.lines = [];
    this.editArea.innerHTML = "";
    this.file = file;

    content.forEach((line) => {
      const newLine = new QuillLine();
      this.lines.push(newLine);
      newLine.insert(line, 0);
      this.editArea.appendChild(newLine);
      // this.selection.bumpSelection(1, line.length - 1);
    });

    this.selection = new Selection();
    this.setSelection();
  }
}

if (!customElements.get("quill-buffer")) {
  customElements.define("quill-buffer", QuillBuffer);
}
