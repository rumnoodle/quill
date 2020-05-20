const fs = require("fs");

export function open(path) {
  try {
    const content = fs.readFileSync(path);
    return { status: "ok", content: content };
  } catch (error) {
    let message = `Could not open file ${path}`;

    if (error.message.startsWith("ENOENT: no such file or directory")) {
      message = `File ${path} does not exist`;
    }

    return { status: "error", message: message };
  }
}

export function save(path) {
  // implement
}

export function openDirectory(path) {
  return fs.opendirSync(path);
}
