import EventBroker from "../event-broker.js";
import { open } from "../server/file.js";

export const command = "ctrl-o";

export function callback(shadows) {
  EventBroker.registerListener("fileAction", handleFileAction);
  shadows.actionBar.requestAction("fileAction");
}

function handleFileAction(path) {
  const { status, content } = open(path);

  if (status === "ok") {
    EventBroker.emit("fileContentFetched", {
      file: path,
      content: content,
    });
  } else if (status === "error") {
    EventBroker.emit("error", { message: content });
  }

  EventBroker.unregisterListener("fileAction", handleFileAction);
}
