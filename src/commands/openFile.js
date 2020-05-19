import EventBroker from "../event-broker.js";
import { open } from "../server/file.js";

export const command = "ctrl-o";

export function callback(shadows) {
  EventBroker.registerListener("fileAction", handleFileAction);
  shadows.actionBar.requestAction("fileAction");
}

function handleFileAction(path) {
  const fileContent = open(path);

  if (fileContent.status === "ok") {
    EventBroker.emit("fileContentFetched", {
      file: path,
      content: fileContent.content,
    });
  } else if (fileContent.status === "error") {
    EventBroker.emit("error", { message: fileContent.message });
  }

  EventBroker.unregisterListener("fileAction", handleFileAction);
}
