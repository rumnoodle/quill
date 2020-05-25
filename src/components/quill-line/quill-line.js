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
    const currentFragment = this.getFragmentPosition(start);
    const endFragment = this.getFragmentPosition(end);

    if (currentFragment.index === endFragment.index) {
      this.lineFragments[currentFragment.index].setSelection(
        currentFragment.position,
        endFragment.position
      );
    } else {
      //loop them all
    }
  }

  insert(string, column) {
    const { index, position } = this.getFragmentPosition(column);
    const overflow = this.lineFragments[index].insert(string, position);

    if (overflow) {
      if (this.lineFragments[index + 1] === undefined) {
        const newFragment = new QuillLineFragment();
        this.lineFragments.push(newFragment);
        this.line.appendChild(newFragment);
        newFragment.insert(overflow, 0);
      } else {
        this.insert(overflow, column + string.length);
      }
    }
  }

  getFragmentPosition(column) {
    let index = 0;
    let lineColumns = 0;

    while (true) {
      if (lineColumns + this.lineFragments[index].length >= column) {
        break;
      }
      lineColumns += this.lineFragments[index].length;
      index++;
    }

    return { index: index, position: column - lineColumns };
  }

  getText() {
    let content = "";
    for (let index = 0; index < this.lineFragments.length; index++) {
      content += this.lineFragments[index].getText();
    }
    return content;
  }

  splitAtSelection() {
    // do something
  }
}

if (!customElements.get("quill-line")) {
  customElements.define("quill-line", QuillLine);
}
