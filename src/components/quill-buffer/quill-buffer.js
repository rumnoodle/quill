import EventBroker from "../event-broker.js";

export default class QuillBuffer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

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

if (!customElements.get("quill-buffer")) {
  customElements.define("quill-buffer", QuillBuffer);
}
