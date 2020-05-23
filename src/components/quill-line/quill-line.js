import QuillLineFragment from "./quill-line-fragment-component.js";

export default class QuillLine extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    this.line = this.shadowRoot.getElementById("line");

    this.lineFragments = [];
    const fragment = new QuillLineFragment();
    this.lineFragments.push(fragment);
    this.line.appendChild(fragment);
  }

  setSelection(start, end) {
    const startFragment = Math.floor(start / 120);
    const endFragment = Math.floor(end / 120);

    if (startFragment === endFragment) {
      this.lineFragments[startFragment].setSelection(start % 120, end % 120);
    } else {
      //loop them all
    }
  }

  insert(string, column) {
    const fragment = Math.floor(column / 120);
    this.lineFragments[fragment].insert(string, column % 120);
  }

  getContent() {
    // content = this.line.textContent;
    // return content;
  }

  splitAtSelection() {
    // do something
  }
}

if (!customElements.get("quill-line")) {
  customElements.define("quill-line", QuillLine);
}
