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
      if (range1.includes(range2[j])) {
        output++;
        break;
      }
    }

    continue;
  }

  for (let j = 0; j < range1.length; j++) {
    if (range2.includes(range1[j])) {
      output++;
      break;
    }
  }

  continue;
}

console.log(output);
