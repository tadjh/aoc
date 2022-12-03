// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const arr = input.split("\r\n").map((el) => el.split(""));

const letters = "abcdefghijklmnopqrstuvwxyz";
const chars = letters.split("").concat(letters.toUpperCase().split(""));

let score: { [key: string]: number } = {};

for (let i = 0; i < chars.length; i++) {
  score = { ...score, [chars[i]]: i + 1 };
}

let output = 0;

for (let i = 0; i < arr.length; i++) {
  const comp1 = arr[i].slice(0, Math.ceil(arr[i].length / 2));
  const comp2 = arr[i].slice(Math.ceil(arr[i].length / 2));

  for (let j = 0; j < comp1.length; j++) {
    if (comp2.includes(comp1[j])) {
      output += score[comp1[j]];
      break;
    }
  }
}

console.log(output);
