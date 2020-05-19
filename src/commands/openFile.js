import EventBroker from "../event-broker.js";
import { open } from "../server/file.js";

export const command = "ctrl-o";

export function callback(shadows) {
  EventBroker.registerListener("fileAction", handleFileAction);
  shadows.actionBar.requestAction("fileAction");
}

function handleFileAction(path) {
  const fileContents = open(path);

  if (fileContents.status === "error") {
    EventBroker.emit("errorStatus", { message: fileContents.message });
  }

  EventBroker.unregisterListener("fileAction", handleFileAction);
}
