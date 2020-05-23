export default class QuillLineFragment extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    this.lineFragment = this.shadowRoot.getElementById("line-fragment");
    this.lineFragment.innerHTML = this.getEOL();
  }

  insert(string, column) {
    const content = this.lineFragment.textContent;
    const beforeInput = content.substring(0, column);
    let afterInput = content.substring(column);
    const eol = this.shadowRoot.getElementById("eol");
    if (eol) {
      afterInput = afterInput.substring(0, -1) + this.getEOL();
    }
    this.lineFragment.innerHTML = `${beforeInput}${string}${afterInput}`;
  }

  getContent() {
    // content = this.line.textContent;
    // return content;
  }

  getEOL() {
    return '<span id="eol">&nbsp;</span>';
  }

  setSelection(start, end) {
    const eol = this.shadowRoot.getElementById("eol");
    const textContent = this.lineFragment.textContent;

    if (eol && end === textContent.length) {
      const preSelection = textContent.substring(0, start);
      const selection = textContent.substring(start, end - 1);
      const eol = this.getEOL();
      this.lineFragment.innerHTML = `${preSelection}<span id="selection">${selection}${eol}</span>`;
    } else {
      const preSelection = textContent.substring(0, start);
      const selection = textContent.substring(start, end);
      const postSelection = textContent.substring(end, 120);
      this.lineFragment.innerHTML = `${preSelection}${selection}${postSelection}`;
    }
    // console.log(`setting fragment (${start}, ${end})`);
    // console.log(this.lineFragment.innerHTML.length);
  }
}

if (!customElements.get("quill-line-fragment")) {
  customElements.define("quill-line-fragment", QuillLineFragment);
}
