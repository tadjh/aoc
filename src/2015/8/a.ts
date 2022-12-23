// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n") as string[];

let strLen = 0;
let charLen = 0;

for (const line of lines) {
  console.log(line);

  strLen += line.length;

  for (let i = 1; i < line.length - 1; i++) {
    // console.log(line[i]);
    charLen += 1;
    if (line[i] === "\\") {
      if (line[i + 1] === "x") {
        i = i + 3;
        continue;
      }

      if (line[i + 1] === '"' || line[i + 1] === "\\") {
        i++;
        continue;
      }
    }
  }
}

console.log(strLen, charLen);

console.log(strLen - charLen);
