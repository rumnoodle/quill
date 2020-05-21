import EventBroker from "../event-broker.js";

export const command = "ctrl-l";

export function callback(shadows) {
  EventBroker.emit("move", { direction: "right", step: "character" });
}
