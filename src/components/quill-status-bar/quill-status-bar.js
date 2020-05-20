import EventBroker from "../event-broker.js";

export default class QuillStatusBar extends HTMLElement {
  constructor() {
    super();
    this.currentMessage = "";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    EventBroker.registerListener("error", (data) => {
      this.handleError(data);
    });

    EventBroker.registerListener("fileOpened", (filename) => {
      this.currentMessage = filename;
      this.handleInfo(filename);
    });

    EventBroker.registerListener("fileSaved", (filename) => {
      const content = `${filename} (saved)`;
      this.handleInfo(content);
    });
  }

  handleError(data) {
    const statusBar = this.shadowRoot.getElementById("status-bar");
    statusBar.innerHTML = data.message;
    statusBar.className = "";
    statusBar.classList.add("error");

    setTimeout(() => {
      statusBar.className = "";
      statusBar.className = "default-from-error";
      statusBar.innerHTML = this.currentMessage;
    }, 5000);
  }

  handleInfo(filename) {
    const statusBar = this.shadowRoot.getElementById("status-bar");
    statusBar.innerHTML = filename;
    statusBar.className = "";
    statusBar.classList.add("info");

    setTimeout(() => {
      statusBar.className = "";
      statusBar.className = "default-from-info";
      statusBar.innerHTML = this.currentMessage;
    }, 3000);
  }
}

if (!customElements.get("quill-status-bar")) {
  customElements.define("quill-status-bar", QuillStatusBar);
}
