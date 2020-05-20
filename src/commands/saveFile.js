import EventBroker from "../event-broker.js";
import { save } from "../server/file.js";

export const command = "ctrl-s";

export function callback(shadows) {
  const path = shadows.manager.currentFile;
  const content = shadows.buffer.getContent();
  EventBroker.emit("fileSaved", path);
  console.log(`file ${path} has been saved`);
  console.log(content);
}
