// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
// let line = input.split("") as string[];

function splitLine(line: string) {
  let output = "";
  let len = 0;
  for (let i = 0; i < line.length; i++) {
    len = 1;
    for (let j = i + 1; j < line.length; j++) {
      if (line[i] !== line[j]) break;
      len += 1;
      i += 1;
    }
    // console.log("len", len, "char", line[i]);
    output += len + line[i];
    // console.log("next i", i + 1);
  }
  return output;
}

function run(line: string, steps: number) {
  let iters = 0;
  while (iters < steps) {
    line = splitLine(line);
    iters++;
  }
  return line.length;
}

console.log(run(input, 50));
