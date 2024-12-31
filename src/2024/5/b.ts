// deno run --watch --allow-all b.ts

class Parser {
  private position = 0;
  private hashmap = new Map<number, number[]>();
  private hashmapR = new Map<number, number[]>();
  private rules: string;
  private updates: number[][];

  constructor(input: string) {
    const [rules, updates] = input.split("\n\n");
    this.rules = rules;
    this.updates = updates
      .split("\n")
      .map((el) => el.split(",").map((e) => parseInt(e)));

    try {
      while (this.position < rules.length) {
        const l = this.next();
        const r = this.next();
        const prev = this.hashmap.get(l) || [];
        // const prevR = this.hashmapR.get(r) || [];
        this.hashmap.set(l, [...prev, r]);
        // this.hashmapR.set(r, [...prevR, l]);
      }
    } catch (error) {
      console.log((error as Error).message);
    }
  }

  peek() {
    return this.position < this.rules.length ? this.rules[this.position] : "";
  }

  advance() {
    return this.position < this.rules.length ? this.rules[this.position++] : "";
  }

  next() {
    while (this.position < this.rules.length) {
      const char = this.peek();

      if (/[0-9]/.test(char)) {
        return this.readNumber();
      }

      if (char === "|") {
        this.advance();
        continue;
      }
      if (char === "\n") {
        this.advance();
        continue;
      }

      throw new Error(`Unknown character ${char}`);
    }

    throw new Error(`EOF`);
  }

  readNumber() {
    let value = "";
    while (/[0-9]/.test(this.peek())) {
      value += this.advance();
    }

    return parseInt(value);
  }

  check(curr: number[], pos: number): boolean {
    for (let i = pos + 1; i < curr.length; i++) {
      if (this.hashmap.get(curr[i])?.includes(curr[pos])) {
        console.log("\t", curr[pos], "can't come before", curr[i]);
        return false;
      }
    }
    // console.log("\t", num, "has no conflicts");
    return true;
  }

  checkAll(curr: number[]): boolean {
    console.log(`Checking`, curr);
    for (let i = 0; i < curr.length; i++) {
      const isValid = this.check(curr, i);
      if (!isValid) return false;
    }
    return true;
  }

  fix(order: number[], curr: number) {
    for (let i = curr + 1; i < order.length; i++) {
      if (this.hashmap.get(order[i])?.includes(order[curr])) {
        const temp = order[curr];
        order.splice(curr, 1);
        order.splice(i, 0, temp);
        console.log("\t Fixed:", order);
      }
    }
  }

  parseAll() {
    return this.updates.reduce((prev, curr) => {
      const mid = Math.ceil(curr.length / 2) - 1;
      let pos = 0;
      while (pos < curr.length - 1) {
        const isValid = this.check(curr, pos);
        if (!isValid) return prev;
        pos++;
      }

      return prev + curr[mid];
    }, 0);
  }

  parseErrors() {
    console.log(this.hashmap);

    return this.updates.reduce((prev, curr) => {
      const mid = Math.ceil(curr.length / 2) - 1;

      const isValid = this.checkAll(curr);

      if (isValid) return prev;

      while (true) {
        for (let i = 0; i < curr.length; i++) {
          this.fix(curr, i);
        }
        const isFixed = this.checkAll(curr);

        if (isFixed) return prev + curr[mid];
      }
    }, 0);
  }
}

const input = await Deno.readTextFile("input.txt");

const parse = new Parser(input);

console.log(parse.parseErrors());
