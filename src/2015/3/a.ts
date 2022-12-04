// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const arr = input.split("\r\n").map((el) => el.split("")) as (
  | "^"
  | ">"
  | "v"
  | "<"
)[][];

console.log(arr);

let output = 0;

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

for (let i = 0; i < arr.length; i++) {
  const visited: { [key: string]: number } = {};

  let visits = 1;

  let position: [number, number] = [0, 0];

  const [a, b] = position;

  visited[a + "," + b] = 1;

  for (let j = 0; j < arr[i].length; j++) {
    position = add(position, move[arr[i][j]]);

    const [c, d] = position;

    if (!visited[c + "," + d]) {
      visited[c + "," + d] = 1;
      ++visits;
      continue;
    }

    visited[c + "," + d] += 1;
  }

  // console.log(visited);
  console.log(visits);

  output += visits;
}
