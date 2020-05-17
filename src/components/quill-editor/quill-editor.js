import QuillBuffer from "./quill-buffer-component.js";
import QuillManager from "./quill-manager-component.js";
import QuillActionBar from "./quill-action-bar-component.js";
import QuillStatusBar from "./quill-status-bar-component.js";

import CommandHandler from "../../src/command-handler.js";

export default class QuillEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    const article = document.createElement("article");

    const actionBar = new QuillActionBar();
    article.appendChild(actionBar);

    let mainEditArea = document.createElement("section");
    mainEditArea.id = "main-edit-area";

    const buffer = new QuillBuffer();
    buffer.id = "quill-buffer";
    mainEditArea.appendChild(buffer);

    const manager = new QuillManager();
    manager.id = "qiull-manager";
    mainEditArea.appendChild(manager);

    article.appendChild(mainEditArea);

    const statusBar = new QuillStatusBar();
    article.appendChild(statusBar);

    this.shadowRoot.appendChild(article);

    this.shadows = {
      actionBar: actionBar,
      buffer: buffer,
      manager: manager,
      statusBar: statusBar,
    };

    new CommandHandler(this.shadows);
  }
}

if (!customElements.get("quill-editor")) {
  customElements.define("quill-editor", QuillEditor);
}
