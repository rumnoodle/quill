import Commands from "./commands.js";

export default class EventHandler {
  constructor() {
    const commands = new Commands();
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
        handleCommand(`${commandKeys}-${e.key.toLowerCase()}`);
      }
      //   console.log(command);
      //   console.log(e);
    });
  }

  handleCommand(command) {
    console.log(command);
  }
}
