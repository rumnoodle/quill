const fs = require("fs");

export default class Commands {
  constructor(shadows) {
    this.shadows = shadows;
    this.commands = {};

    (async () => {
      const eventsDir = fs.opendirSync("./src/commands");
      let file = eventsDir.readSync();

      while (file) {
        let { command, callback } = await import(`./commands/${file.name}`);
        this.commands[command] = callback;

        file = eventsDir.readSync();
      }
    })();
  }

  run(command) {
    this.commands[command](this.shadows);
  }
}
