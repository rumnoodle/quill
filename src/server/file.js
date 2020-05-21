const fs = require("fs");

export function open(path) {
  try {
    const content = fs.readFileSync(path, { encoding: "utf8" });
    return {
      status: "ok",
      content: content
        .split(" ")
        .join("\xa0")
        .split(/\r\n|\r|\n/),
    };
  } catch (error) {
    let message = `Could not open file ${path}`;

    if (error.message.startsWith("ENOENT: no such file or directory")) {
      message = `File ${path} does not exist`;
    }

    return { status: "error", content: message };
  }
}

export function save(path, content) {
  fs.writeFileSync(path, content);
}

export function openDirectory(path) {
  return fs.opendirSync(path);
}
