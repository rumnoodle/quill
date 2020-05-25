export default class QuillLineFragment extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";
    this.length = 1;

    this.lineFragment = this.shadowRoot.getElementById("line-fragment");
    this.lineFragment.innerHTML = this.getEOL();
  }

  insert(string, column) {
    const content = this.lineFragment.textContent;
    const beforeInput = content.substring(0, column);
    let afterInput = content.substring(column);
    const eol = this.shadowRoot.getElementById("eol");
    if (eol) {
      afterInput =
        afterInput.substring(0, afterInput.length - 1) + this.getEOL();
    }
    this.lineFragment.innerHTML = `${beforeInput}${string}${afterInput}`;
    return this.checkForOverflow();
  }

  checkForOverflow() {
    const eol = this.shadowRoot.getElementById("eol");
    let content = this.lineFragment.textContent;
    let overflow = "";

    if (content.length > 120) {
      if (eol) {
        content = content.substring(0, content.length - 1);
      }
      const contentEnd = content.lastIndexOf("\xa0") + 1;
      this.lineFragment.textContent = content.substring(0, contentEnd);
      overflow = content.substring(contentEnd);
    }

    this.length = this.lineFragment.textContent.length;

    return overflow;
  }

  getText() {
    const eol = this.shadowRoot.getElementById("eol");
    const content = this.lineFragment.textContent;
    return eol !== undefined
      ? content.substring(0, content.length - 1)
      : content;
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
      let postSelection = textContent.substring(end);

      if (eol) {
        postSelection =
          postSelection.substring(0, postSelection.length - 1) + this.getEOL();
      }
      this.lineFragment.innerHTML = `${preSelection}<span id="selection">${selection}</span>${postSelection}`;
    }
  }
}

if (!customElements.get("quill-line-fragment")) {
  customElements.define("quill-line-fragment", QuillLineFragment);
}
