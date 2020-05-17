import Commands from "./commands.js";

export default class EventHandler {
  constructor(domMap) {
    console.log(domMap);
    this.commands = new Commands(domMap);
    window.addEventListener("keydown", (e) => {
      let commandKeys = [
        e.ctrlKey ? "ctrl" : undefined,
        e.altKey ? "alt" : undefined,
        e.metaKey ? "meta" : undefined,
        e.shiftKey ? "shift" : undefined,
      ]
        .filter((key) => key !== undefined)
        .join("-");

      if (/^[a-zA-Z]$/.test(e.key) && commandKeys) {
        this.commands.handle(`${commandKeys}-${e.key.toLowerCase()}`);
      }
    });
  }
}
