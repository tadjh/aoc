// deno run --watch --allow-all b.ts

export {};
const input = await Deno.readTextFile("test.txt");
const lines = input.split("\r\n") as string[];

console.log(lines);

let output = "";

for (const line of lines) {
  output += line;
}

console.log(output);
