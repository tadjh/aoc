export class Parser {
  private input: string;
  private output: string = "";
  private position = 0;
  private cols = 0;
  private rows = 0;
  private inc = 1;
  private count = 0;

  constructor(input: string) {
    this.input = input;

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

  search() {
    for (let i = 0; i < this.input.length; i++) {
      this.position = i;
      const peek = this.peek();

      //   console.log(i, peek);

      try {
        if (peek === "X") {
          const [X, idX] = this.next("X");
          const [M, idM] = this.next("M");
          const [A, idA] = this.next("A");
          if (i === 73) {
            console.log(
              "here",
              this.inc,
              this.input[i],
              this.input[i + this.inc],
              this.input[i + this.inc + this.inc],
              this.input[i + this.inc + this.inc + this.inc]
            );
          }
          const [S, idS] = this.next("S");

          this.count++;

          const output = [...this.output];
          output[idX] = X;
          output[idM] = M;
          output[idA] = A;
          output[idS] = S;

          this.output = output.join("");
        }

        if (peek === "S") {
          const [S, idS] = this.next("S");
          const [A, idA] = this.next("A");
          const [M, idM] = this.next("M");
          const [X, idX] = this.next("X");

          this.count++;

          const output = [...this.output];
          output[idS] = S;
          output[idA] = A;
          output[idM] = M;
          output[idX] = X;

          this.output = output.join("");
        }
      } catch (error) {
        if (i === 73) {
          console.log((error as Error).message);
        }
      }
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

  print() {
    this.horizontal();
    this.vertical();
    this.diagonalRight();
    this.diagonalLeft();
    console.log(`Occurances ${this.count}`);
    return [...this.output].join("");
  }

  reset() {
    this.inc = 1;
  }
}
