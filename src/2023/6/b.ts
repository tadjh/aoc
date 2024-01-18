// deno run --watch --allow-all b.ts

const input = await Deno.readTextFile("test.txt");
const output = input.split("\r\n");

console.log(output);
