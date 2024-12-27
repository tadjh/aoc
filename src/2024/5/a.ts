// deno run --watch --allow-all a.ts

const input = await Deno.readTextFile("input.txt");

const [rules, updates] = input.split("\n\n");
let position = 0;
const hashmap = new Map<number, number[]>();
const hashmapR = new Map<number, number[]>();

function peek() {
  return position < rules.length ? rules[position] : "";
}

function advance() {
  return position < rules.length ? rules[position++] : "";
}

function readNumber() {
  let value = "";
  while (/[0-9]/.test(peek())) {
    value += advance();
  }

  return parseInt(value);
}

function next() {
  while (position < rules.length) {
    const char = peek();

    if (/[0-9]/.test(char)) {
      return readNumber();
    }

    if (char === "|") {
      advance();
      continue;
    }
    if (char === "\n") {
      advance();
      continue;
    }

    throw new Error(`Unknown character ${char}`);
  }

  throw new Error(`EOF`);
}

try {
  while (position < rules.length) {
    const l = next();
    const r = next();
    const prev = hashmap.get(l) || [];
    const prevR = hashmapR.get(r) || [];
    hashmap.set(l, [...prev, r]);
    hashmapR.set(r, [...prevR, l]);
  }
} catch (error) {
  console.log((error as Error).message);
}

// hashmap.forEach((v, k) => {
//   console.log(k, v);
// });

// console.log("\n");

// hashmapR.forEach((v, k) => {
//   console.log(k, v);
// });

console.log("\n");

function check(num: number, rest: number[]): boolean {
  let p = 0;
  while (p < rest.length) {
    if (hashmap.get(rest[p])?.includes(num)) {
      return false;
    }
    p++;
  }

  return true;
}

const orders = updates
  .split("\n")
  .map((el) => el.split(",").map((e) => parseInt(e)))
  .reduce((prev, curr) => {
    const mid = Math.ceil(curr.length / 2) - 1;
    let pos = 0;
    while (pos < curr.length - 1) {
      const num = curr[pos];
      const rest = curr.slice(pos + 1);
      const isValid = check(num, rest);
      if (!isValid) return prev;
      pos++;
    }

    return prev + curr[mid];
  }, 0);

console.log(orders);
