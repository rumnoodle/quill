import QuillBuffer from "./quill-buffer-component.js";
import QuillCaret from "./quill-caret-component.js";
import EventBroker from "../event-broker.js";

export default class QuillEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    const buffer = new QuillBuffer();

    const caret = new QuillCaret();
    buffer.setCaret(caret);

    this.shadowRoot.appendChild(buffer);

    EventBroker.registerListener("fileContentFetched", (data) => {
      this.loadContent(data);
    });
  }

  loadContent({ file, content }) {
    const textArea = this.shadowRoot.getElementById("text-area");
    textArea.value = content;
    textArea.focus();
    EventBroker.emit("fileOpened", file);
  }

  getContent() {
    return this.shadowRoot.getElementById("text-area").value;
  }
}

if (!customElements.get("quill-editor")) {
  customElements.define("quill-editor", QuillEditor);
}
