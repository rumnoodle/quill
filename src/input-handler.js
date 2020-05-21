import Commands from "./commands.js";
import EventBroker from "./event-broker.js";

export default class InputHandler {
  constructor(shadows) {
    this.commands = new Commands(shadows);
    this.replacements = {
      " ": "\xa0",
    };
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
          // console.log(error);
        }
      } else if (
        (!commandKeys || commandKeys === "shift") &&
        !this.isStopKey(e.key)
      ) {
        EventBroker.emit("input", this.inputConverter(e.key));
      }
    });
  }

  isStopKey(key) {
    const stopKeys = [
      "Enter",
      "Backspace",
      "Delete",
      "ArrowUp",
      "ArrowDown",
      "ArrowRight",
      "ArrowLeft",
      "CapsLock",
      "Insert",
      "Escape",
      "AltGraph",
      "Home",
      "End",
      "PageUp",
      "PageDown",
      "F1",
      "F2",
      "F3",
      "F4",
      "F5",
      "F6",
      "F7",
      "F8",
      "F9",
      "F10",
      "F11",
      "F12",
      "Shift",
    ];
    return stopKeys.indexOf(key) !== -1;
  }

  inputConverter(key) {
    return this.replacements[key] !== undefined ? this.replacements[key] : key;
  }
}
