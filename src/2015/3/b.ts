// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("test.txt");
const arr = input.split("") as string[];

let output = "";

const _lookup = {
  "": 0,
};

for (let i = 0; i < arr.length; i++) {
  output += arr[i];
}

console.log(output);
