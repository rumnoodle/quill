import { openDirectory } from "./server/file.js";

export default class Commands {
  constructor(shadows) {
    this.shadows = shadows;
    this.commands = {};

    (async () => {
      const eventsDir = openDirectory("./src/commands");
      let file = eventsDir.readSync();

      while (file) {
        let { command, callback } = await import(`./commands/${file.name}`);
        this.commands[command] = callback;

        file = eventsDir.readSync();
      }
    })();
  }

  run(command) {
    if (this.commands[command]) {
      this.commands[command](this.shadows);
    } else {
      // do something here, maybe emit message that command is missing. Maybe log something
    }
  }
}
