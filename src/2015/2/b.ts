// deno run --watch --allow-all a.ts

// 2*l*w + 2*w*h + 2*h*l

export {};
const input = await Deno.readTextFile("input.txt");
const arr = input
  .split("\r\n")
  .map((el) => el.split("x").map((str) => parseInt(str))) as [
  number,
  number,
  number
][];

let output = 0;

for (let i = 0; i < arr.length; i++) {
  const [l, w, h] = arr[i];
  const small1 = Math.min(l, w);
  const small2 = Math.min(small1 === w ? l : w, h);
  output += small1 + small1 + small2 + small2 + l * w * h;
}

console.log(output);
