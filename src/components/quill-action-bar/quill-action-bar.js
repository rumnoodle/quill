import EventBroker from "../../src/event-broker.js";

export default class QuillActionBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";
  }

  requestAction(name) {
    EventBroker.emit("mode", "action");
    const actionBar = this.shadowRoot.getElementById("action-bar");
    actionBar.classList.remove("hidden");

    const inputElem = this.shadowRoot.getElementById("action-input");
    inputElem.focus();
    inputElem.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        EventBroker.emit("mode", "default");
        EventBroker.emit(name, inputElem.value);
        actionBar.classList.add("hidden");
        inputElem.value = "";
      }
    });
  }
}

if (!customElements.get("quill-action-bar")) {
  customElements.define("quill-action-bar", QuillActionBar);
}
