// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const containers = input
  .split("\r\n")
  .map((line) => parseInt(line)) as number[];

const max = 150;

function pourAll(containers: number[], max: number) {
  let combinations: number[][] = [];

  function pour(arr: number[], max: number, curr: number[] = []): number[] {
    if (max === 0) {
      if (
        combinations[0] !== undefined &&
        curr.length > 0 &&
        curr.length < combinations[0].length
      ) {
        combinations = [curr];
      } else if (
        combinations[0] === undefined ||
        curr.length === combinations[0].length
      ) {
        combinations.push(curr);
      }
      // } else if (
      //   combinations[0] !== undefined &&
      //   curr.length > combinations[0].length
      // ) {
      //   // skip
      // }
      return [];
    }
    const containers = arr.slice();
    for (let i = 0; i < containers.length; i++) {
      if (containers[i] > max) continue;
      const clone = containers.slice(i + 1);
      pour(clone, max - containers[i], [...curr, containers[i]]);
    }
    return [];
  }

  pour(containers, max);

  // console.log(combinations);

  return combinations;
}

console.log(pourAll(containers, max).length);
