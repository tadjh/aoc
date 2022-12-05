// deno run --watch --allow-all a.ts\\
export {};
const input = await Deno.readTextFile("input.txt");
const [input1, input2] = input.split("\r\n\r\n");
const crates = input1.split("\r\n");
const moves = input2.split("\r\n").map((el) => el.split(" "));
const stack: string[][] = [];

for (let i = 0; i < crates.length; i++) {
  if (i === crates.length - 1) break;
  const line = crates[i];
  let col = 0;
  for (let j = 0; j < line.length; j++) {
    if ((j - 1) % 4 === 0) {
      if (!stack[col]) {
        stack[col] = [];
      }

      if (line[j] !== " ") {
        stack[col].push(line[j]);
      }

      col++;
    }
  }
}

stack.map((el) => el.reverse());

for (let i = 0; i < moves.length; i++) {
  const instruction = moves[i];
  for (let j = 0; j < parseInt(instruction[1]); j++) {
    const crate = stack[parseInt(instruction[3]) - 1].pop();
    if (!crate) break;
    stack[parseInt(instruction[5]) - 1].push(crate);
  }
}

let output = "";

for (const col of stack) {
  output += col.pop();
}

console.log(output);
