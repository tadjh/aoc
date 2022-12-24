// deno run --watch --allow-all b.ts

export {};
const input = await Deno.readTextFile("input.txt");
const locations = new Set<string>();
const lines = input.split("\n").map((el) =>
  el.split(" ").filter((el, i) => {
    if (i === 1 || i === 3) return false;
    if (i === 0 || i === 2) locations.add(el);
    return el;
  })
) as string[][];

const lookup = (function () {
  const map = new Map<string, number>();
  for (const [start, end, dist] of lines) {
    map.set(start + end, parseInt(dist));
    map.set(end + start, parseInt(dist));
  }
  return map;
})();

function generatePermutations() {
  const output: string[][] = [];
  function permute(locations: string[], result: string[] = []) {
    if (locations.length === 0) return output.push(result);
    for (let i = 0; i < locations.length; i++) {
      const clone = [...locations];
      clone.splice(i, 1);
      permute(clone, [...result, locations[i]]);
    }
  }
  permute(Array.from(locations));
  return output;
}

function getDistance(permutation: string[]) {
  let dist = 0;
  for (let i = 0; i < permutation.length - 1; i++) {
    const next = lookup.get(permutation[i] + permutation[i + 1]);
    if (next === undefined) throw new Error("Shouldn't happen");
    dist += next;
  }
  return dist;
}

function getDistances(permutations: string[][]) {
  const distances = [];
  for (const permutation of permutations) {
    distances.push(getDistance(permutation));
  }
  return distances;
}

function getLowest(distances: number[]) {
  let min = -1;
  for (const dist of distances) {
    if (min === -1) {
      min = dist;
      continue;
    }
    min = Math.min(min, dist);
  }
  return min;
}

function getHighest(distances: number[]) {
  let max = -1;
  for (const dist of distances) {
    if (max === -1) {
      max = dist;
      continue;
    }
    max = Math.max(max, dist);
  }
  return max;
}

const permutations = generatePermutations();
const distances = getDistances(permutations);
console.log(getHighest(distances));
