// deno run --watch --allow-all a.ts\\
export {};
const input = await Deno.readTextFile("input.txt");
const [input1, input2] = input.split("\r\n\r\n");
const crates = input1.split("\r\n");
const moves = input2.split("\r\n").map((el) => el.split(" "));

const stack: string[][] = [];

for (const line of crates) {
  if (line === crates[crates.length - 1]) break;
  let col = 0;
  for (let i = 0; i < line.length; i++) {
    if ((i - 1) % 4 === 0) {
      if (!stack[col]) {
        stack[col] = [];
      }

      if (line[i] !== " ") {
        stack[col].push(line[i]);
      }

      col++;
    }
  }
}

stack.map((el) => el.reverse());

for (const line of moves) {
  const from = stack[parseInt(line[3]) - 1];

  const to = stack[parseInt(line[5]) - 1];

  const moved = from.splice(from.length - parseInt(line[1]));

  to.push(...moved);
}

let output = "";

for (const col of stack) {
  output += col[col.length - 1];
}

console.log(output);
