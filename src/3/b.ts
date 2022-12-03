// deno run --watch --allow-all a.ts
const letters = "abcdefghijklmnopqrstuvwxyz";
const chars = letters.split("").concat(letters.toUpperCase().split(""));

let score: { [key: string]: number } = {};

for (let i = 0; i < chars.length; i++) {
  score = { ...score, [chars[i]]: i + 1 };
}
export {};
const input = await Deno.readTextFile("input.txt");
const arr = input.split("\r\n").map((el) => el.split(""));
let output = 0;
const chunkSize = 3;
for (let i = 0; i < arr.length; i += chunkSize) {
  const [sack1, sack2, sack3] = arr.slice(i, i + chunkSize);

  const hashes: { [key: string]: boolean } = {};

  for (const item1 of sack1) {
    if (!(item1 in hashes)) {
      hashes[item1] = false;
    }
  }

  for (const item2 of sack2) {
    if (item2 in hashes) {
      hashes[item2] = true;
    }
  }

  for (const item3 of sack3) {
    if (item3 in hashes && hashes[item3] === true) {
      output += score[item3];
      break;
    }
  }
}

console.log(output);
