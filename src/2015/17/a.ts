// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const containers = input
  .split("\r\n")
  .map((line) => parseInt(line)) as number[];

const max = 150;

function pourAll(containers: number[], max: number) {
  const combinations: number[][] = [];

  function pour(arr: number[], max: number, curr: number[] = []): number[] {
    if (max === 0) {
      combinations.push(curr);
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

  console.log(combinations);

  return combinations;
}

console.log(pourAll(containers, max).length);
