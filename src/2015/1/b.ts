// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const arr = input.split("") as ("(" | ")")[];

let output = 0;

const lookup = {
  "(": 1,
  ")": -1,
};

for (let i = 0; i < arr.length; i++) {
  output += lookup[arr[i]];

  if (output === -1) {
    output = i + 1;
    break;
  }
}

console.log(output);
