// deno run --watch --allow-all a.ts

const input = await Deno.readTextFile("test.txt");
const output = input.split("\r\n");

console.log(output);