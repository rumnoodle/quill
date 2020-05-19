const fs = require("fs");

export function open(path) {
  try {
    const contents = fs.readFileSync(path);
    return { status: "ok", contents: contents };
  } catch (error) {
    let message = `Could not open file ${path}`;

    if (error.message.startsWith("ENOENT: no such file or directory")) {
      message = `File ${path} does not exist`;
    }

    return { status: "error", message: message };
  }
}

export function openDirectory(path) {
  return fs.opendirSync(path);
}
