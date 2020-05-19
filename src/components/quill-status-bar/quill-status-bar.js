import EventBroker from "../../src/event-broker.js";

export default class QuillStatusBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    EventBroker.registerListener("errorStatus", (data) => {
      this.handleError(data);
    });
  }

  handleError(data) {
    console.log(data);
    const statusBar = this.shadowRoot.getElementById("status-bar");
    statusBar.innerHTML = data.message;
    statusBar.className = "";
    statusBar.classList.add("error");
  }
}

if (!customElements.get("quill-status-bar")) {
  customElements.define("quill-status-bar", QuillStatusBar);
}
