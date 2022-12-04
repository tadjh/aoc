// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const arr = input.split("") as ("^" | ">" | "v" | "<")[];

console.log(arr);

// let output = 0;

const move: { [key in "^" | ">" | "v" | "<"]: [number, number] } = {
  "^": [0, -1],
  ">": [1, 0],
  v: [0, 1],
  "<": [-1, 0],
};

const add = (
  [a0, a1]: [number, number],
  [b0, b1]: [number, number]
): [number, number] => [a0 + b0, a1 + b1];

const visited: { [key: string]: number } = {};

let visits = 1;

let position1: [number, number] = [0, 0];
let position2: [number, number] = [0, 0];

const [a, b] = position1;

visited[a + "," + b] = 2;

for (let i = 0; i < arr.length; i++) {
  if (i % 2 === 0) {
    position1 = add(position1, move[arr[i]]);

    const [c, d] = position1;

    if (!visited[c + "," + d]) {
      visited[c + "," + d] = 1;
      ++visits;
      continue;
    }

    visited[c + "," + d] += 1;
    continue;
  }

  position2 = add(position2, move[arr[i]]);

  const [e, f] = position2;

  if (!visited[e + "," + f]) {
    visited[e + "," + f] = 1;
    ++visits;
    continue;
  }

  visited[e + "," + f] += 1;
}

console.log(visits);
