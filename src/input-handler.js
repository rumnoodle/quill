import Commands from "./commands.js";
import EventBroker from "./event-broker.js";

export default class InputHandler {
  constructor(shadows) {
    this.commands = new Commands(shadows);
    window.addEventListener("keydown", (e) => {
      let commandKeys = [
        e.ctrlKey ? "ctrl" : undefined,
        e.altKey ? "alt" : undefined,
        e.metaKey ? "meta" : undefined,
        e.shiftKey ? "shift" : undefined,
      ]
        .filter((key) => key !== undefined)
        .join("-");

      if (/^[a-zA-Z]$/.test(e.key) && commandKeys && commandKeys !== "shift") {
        try {
          this.commands.run(`${commandKeys}-${e.key.toLowerCase()}`);
        } catch (error) {
          // Do nothing here as trying to perform an action that isn't here isn't necessarily an issue
        }
      } else if (!commandKeys) {
        EventBroker.emit("input", e.key);
      }
    });
  }
}
