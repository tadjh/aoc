// deno run --watch --allow-all b.ts

export {};
const input = await Deno.readTextFile("test.txt");
const arr = input.split("");

let output = "";

for (let i = 0; i < arr.length; i++) {
  output += arr[i];
}

console.log(output);
