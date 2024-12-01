// deno run --watch --allow-all b.ts

const input = await Deno.readTextFile("input.txt");

const lists = input.split("\n").reduce(
  (prev, curr) => {
    const [left, right] = prev;
    const [num1, num2] = curr.split("   ");

    return [
      [...left, Number(num1)],
      [...right, Number(num2)],
    ];
  },
  [[], [], []] as number[][]
);

console.log("lists", lists);

const [left, right] = lists;

const visited = new Map();

function tallySimilar(arr: number[], num: number) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === num) {
      count++;
    }
  }
  return num * count;
}

const similarity = left.reduce((prev, num) => {
  if (visited.has(num)) {
    return prev + visited.get(num);
  }
  const score = tallySimilar(right, num);
  visited.set(num, score);
  return prev + score;
}, 0);

console.log("similarity", similarity);

// list mark star
// must 1of 50
// 50 stars
// empty
// location ID
