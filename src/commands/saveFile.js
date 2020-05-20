import EventBroker from "../event-broker.js";
import { save } from "../server/file.js";

export const command = "ctrl-s";

export function callback(shadows) {
  const path = shadows.manager.currentFile;
  const content = shadows.buffer.getContent();

  if (path !== "") {
    save(path, content);
  }

  EventBroker.emit("fileSaved", path);
}
