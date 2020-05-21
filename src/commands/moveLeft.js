import EventBroker from "../event-broker.js";

export const command = "ctrl-j";

export function callback(shadows) {
  EventBroker.emit("move", { direction: "left", step: "character" });
}
