export class Parser {
  private input: string;
  private output: string = "";
  private position = 0;
  private cols = 0;
  private rows = 0;
  private inc = 1;
  private count = 0;
  private searchString: string;
  private searchStringReversed: string;
  private direction: "normal" | "crossmark" = "normal";

  constructor(
    input: string,
    searchString: string,
    direction?: "normal" | "crossmark"
  ) {
    this.input = input;
    this.searchString = searchString;
    this.searchStringReversed = [...searchString].reverse().join("");
    this.direction = direction || this.direction;

    while (this.position < this.input.length) {
      if (!this.cols && input[this.position] === "\n") {
        this.rows = 1;
        this.cols = this.position;
      }

      if (input[this.position] === "\n") {
        this.rows++;
        this.output += "\n";
      } else {
        this.output += ".";
      }

      this.position++;
    }

    this.position = 0;
  }

  peek() {
    return this.input[this.position];
  }

  advance() {
    const next = this.input[this.position];
    this.position += this.inc;
    return next;
  }

  next(search: string): [string, number] {
    if (this.position < this.input.length) {
      const pos = this.position;
      const char = this.advance();

      if (char === search) {
        return [char, pos];
      }
      throw new Error(`Unexpected char: ${char}`);
    }

    throw new Error("Out of bounds");
  }

  find(str: string) {
    const results: [string, number][] = [];

    for (let i = 0; i < str.length; i++) {
      const result = this.next(str[i]);
      results.push(result);
    }

    return results;
  }

  setOutput(results: [string, number][]) {
    const output = [...this.output];
    for (let k = 0; k < results.length; k++) {
      const [char, id] = results[k];
      output[id] = char;
    }

    this.output = output.join("");
  }

  search() {
    for (let i = 0; i < this.input.length; i++) {
      this.position = i;
      const peek = this.peek();

      try {
        if (peek === this.searchString[0]) {
          const results = this.find(this.searchString);
          this.count++;
          this.setOutput(results);
        }

        if (peek === this.searchStringReversed[0]) {
          const results = this.find(this.searchStringReversed);
          this.count++;
          this.setOutput(results);
        }
      } catch {}
    }
    this.reset();
  }

  horizontal() {
    this.inc = 1;
    this.search();
  }

  vertical() {
    this.inc = this.cols + 1;
    this.search();
  }

  diagonalRight() {
    this.inc = this.cols + 1 + 1;
    this.search();
  }

  diagonalLeft() {
    this.inc = this.cols + 1 - 1;
    this.search();
  }

  crossmark() {
    for (let i = 0; i < this.input.length; i++) {
      this.position = i;
      const middle =
        this.searchString[Math.floor(this.searchString.length / 2)];

      if (this.peek() !== middle) continue;
      if (this.position < this.cols + 1) continue;
      if (this.position > (this.cols + 1) * (this.rows - 1) - 1) continue;
      if ((this.position - this.cols + 1) % (this.cols + 1) === 0) continue;
      if ((this.position - this.cols - 1) % (this.cols + 1) === 0) continue;

      const tl = i - this.cols - 1 - 1;
      const tr = i - this.cols + 1 - 1;
      const bl = i + this.cols - 1 + 1;
      const br = i + this.cols + 1 + 1;

      const corners =
        this.input[tl] + this.input[br] + this.input[bl] + this.input[tr];

      if (
        corners !== "MSMS" &&
        corners !== "SMSM" &&
        corners !== "MSSM" &&
        corners !== "SMMS"
      )
        continue;

      const output = [...this.output];
      output[this.position] = this.input[this.position];
      output[tl] = this.input[tl];
      output[tr] = this.input[tr];
      output[bl] = this.input[bl];
      output[br] = this.input[br];
      this.output = output.join("");
      this.count++;
    }
    this.reset();
  }

  print() {
    if (this.direction === "normal") {
      this.horizontal();
      this.vertical();
      this.diagonalRight();
      this.diagonalLeft();
    }

    if (this.direction === "crossmark") {
      this.crossmark();
    }

    console.log(`Occurances ${this.count}`);
    return this.output;
  }

  reset() {
    this.inc = 1;
  }
}
