import EventBroker from "../event-broker.js";

export const command = "ctrl-o";

export function callback(shadows) {
  EventBroker.registerListener("fileAction", handleFileAction);
  shadows.actionBar.requestAction("fileAction");
}

function handleFileAction(action) {
  console.log(action);
  console.log("woowoo");
  EventBroker.unregisterListener("fileAction", handleFileAction);
}
