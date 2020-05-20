import EventBroker from "../event-broker.js";

export default class QuillStatusBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    EventBroker.registerListener("error", (data) => {
      this.handleError(data);
    });

    EventBroker.registerListener("fileOpened", (filename) => {
      this.handleFile(filename);
    });
  }

  handleError(data) {
    const statusBar = this.shadowRoot.getElementById("status-bar");
    statusBar.innerHTML = data.message;
    statusBar.className = "";
    statusBar.classList.add("error");
  }

  handleFile(filename) {
    const statusBar = this.shadowRoot.getElementById("status-bar");
    statusBar.innerHTML = filename;
    statusBar.className = "";
  }
}

if (!customElements.get("quill-status-bar")) {
  customElements.define("quill-status-bar", QuillStatusBar);
}
