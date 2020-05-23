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
}
