// deno run --watch --allow-all b.ts

export {};
const input = await Deno.readTextFile("input.txt");
const lines = input.split("\n") as string[];

let strLen = 0;
let charLen = 0;

for (const line of lines) {
  charLen += line.length;
  let lineLen = line.length + 4;

  for (let i = 1; i < line.length - 1; i++) {
    if (line[i] === "\\" || line[i] === '"') {
      lineLen += 1;
    }
  }

  console.log("lineLen", lineLen);

  strLen += lineLen;

  lineLen = 0;
}

console.log(strLen, charLen);

console.log(strLen - charLen);
