export default class QuillSelection {
  constructor() {
    this.start = { line: 0, column: 0 };
    this.end = { line: 0, column: 1 };
  }

  inputPosition() {
    return this.start;
  }

  bumpSelection(numberOfLines, numberOfColumns) {
    this.start.line += numberOfLines;
    this.start.column += numberOfColumns;
    this.end.line += numberOfLines;
    this.end.column += numberOfColumns;
  }

  wrapLine(numberOfLines) {
    this.start.line += numberOfLines;
    this.start.column = 0;
    this.end.line += numberOfLines;
    this.end.column = 1;
  }

  unwrapLine(numberOfLines, columnNumber) {
    this.start.line -= numberOfLines;
    this.start.column = columnNumber;
    this.end.line -= numberOfLines;
    this.end.column = columnNumber + 1;
  }
}
