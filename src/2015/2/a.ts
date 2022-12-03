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

console.log(arr);

let output = 0;

for (let i = 0; i < arr.length; i++) {
  const [l, w, h] = arr[i];
  const side1 = l * w;
  const side2 = w * h;
  const side3 = h * l;

  const smallest = Math.min(side1, side2, side3);

  output += 2 * side1 + 2 * side2 + 2 * side3 + smallest;
}

console.log(output);
