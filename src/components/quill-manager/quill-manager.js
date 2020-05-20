import EventBroker from "../event-broker.js";

export default class QuillManager extends HTMLElement {
  constructor() {
    super();
    this.openFiles = {};
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";
    this.currentFile = "";

    EventBroker.registerListener("fileOpened", (filename) => {
      this.currentFile = filename;
    });
  }
}

if (!customElements.get("quill-manager")) {
  customElements.define("quill-manager", QuillManager);
}
