import QuillEditor from "./quill-editor-component.js";
import QuillManager from "./quill-manager-component.js";
import QuillActionBar from "./quill-action-bar-component.js";
import QuillStatusBar from "./quill-status-bar-component.js";

import InputHandler from "../../src/input-handler.js";

export default class QuillMain extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = "";

    const article = document.createElement("article");

    const actionBar = new QuillActionBar();
    article.appendChild(actionBar);

    let mainEditArea = document.createElement("section");
    mainEditArea.id = "main-edit-area";

    const editor = new QuillEditor();
    editor.id = "quill-editor";
    mainEditArea.appendChild(editor);

    const manager = new QuillManager();
    manager.id = "qiull-manager";
    mainEditArea.appendChild(manager);

    article.appendChild(mainEditArea);

    const statusBar = new QuillStatusBar();
    article.appendChild(statusBar);

    this.shadowRoot.appendChild(article);

    this.shadows = {
      actionBar: actionBar,
      editor: editor,
      manager: manager,
      statusBar: statusBar,
    };

    new InputHandler(this.shadows);
  }
}

if (!customElements.get("quill-main")) {
  customElements.define("quill-main", QuillMain);
}
