// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const arr = input.split("\r\n").map((el) =>
  el.split(",").map((a) => {
    const [s, e] = a.split("-");
    const range = [];

    const start = parseInt(s);
    const end = parseInt(e);

    for (let i = start; i < end + 1; i++) {
      range.push(i);
    }
    return range;
  })
) as number[][][];

// console.log(arr);

let output = 0;

// const _lookup = {
//   "": 0,
// };

for (let i = 0; i < arr.length; i++) {
  const [range1, range2] = arr[i];

  if (range1.length > range2.length) {
    //

    for (let j = 0; j < range2.length; j++) {
      const res = range1.includes(range2[j]);

      if (!res) break;

      if (range2.length - 1 === j) output++;
    }

    continue;
  }

  for (let j = 0; j < range1.length; j++) {
    const res = range2.includes(range1[j]);

    if (!res) break;

    if (range1.length - 1 === j) output++;
  }

  continue;

  // output += arr[i];
}

console.log(output);
