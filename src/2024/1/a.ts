// deno run --watch --allow-all a.ts

const input = await Deno.readTextFile("input.txt");

function insert(arr: number[], num: number) {
  if (!arr.length) {
    return [num];
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= num) {
      const head = arr.slice(0, i);
      const tail = arr.slice(i);
      return [...head, num, ...tail];
    }

    if (arr[i] < num && i + 1 === arr.length) {
      return [...arr, num];
    }
  }

  return arr;
}

const sorted = input.split("\n").reduce(
  (prev, curr) => {
    let [left, right] = prev;
    const [num1, num2] = curr.split("   ");

    left = insert(left, Number(num1));
    right = insert(right, Number(num2));

    return [left, right];
  },
  [[], [], []] as number[][]
);

console.log("sorted", sorted);

const [left, right] = sorted;

const diff = left.map((num, i) => Math.abs(num - right[i]));

console.log("diff", diff);

const sum = diff.reduce((prev, curr) => prev + curr, 0);

console.log("sum", sum);

// list mark star
// must 1of 50
// 50 stars
// empty
// location ID
