// deno run --watch --allow-all b.ts

export {};

const numbers = {
  o: [{ name: "one", value: 1 }],
  t: [
    { name: "two", value: 2 },
    { name: "three", value: 3 },
  ],
  f: [
    { name: "four", value: 4 },
    { name: "five", value: 5 },
  ],
  s: [
    { name: "six", value: 6 },
    { name: "seven", value: 7 },
  ],
  e: [{ name: "eight", value: 8 }],
  n: [{ name: "nine", value: 9 }],
} as const;

const input = await Deno.readTextFile("input.txt");
const lines = (input.split("\r\n") as string[]).map((line) =>
  line.split("").reduce(
    (prev, curr, index, arr) => {
      const currInt = parseInt(curr);

      function calculateTotal(
        prev: {
          first: number;
          last: number;
          total: number;
        },
        next: number
      ) {
        if (!prev.first) {
          return {
            ...prev,
            first: next * 10,
            last: next,
            total: next * 10 + next,
          };
        }
        return { ...prev, last: next, total: prev.first + next };
      }

      if (!isNaN(currInt)) {
        return calculateTotal(prev, currInt);
      }

      let result = { success: false, value: 0 };

      function findWordValue(curr: "o" | "t" | "f" | "s" | "e" | "n") {
        for (let i = 0; i < numbers[curr].length; i++) {
          for (let j = 1; j < numbers[curr][i].name.length; j++) {
            if (
              index + j < arr.length &&
              arr[index + j] === numbers[curr][i].name[j]
            ) {
              if (j === numbers[curr][i].name.length - 1) {
                return { success: true, value: numbers[curr][i].value };
              }
              continue;
            }
            break;
          }
        }
        return { success: false, value: 0 };
      }

      switch (curr) {
        case "o":
        case "t":
        case "f":
        case "s":
        case "e":
        case "n":
          result = findWordValue(curr);
          // console.log(curr, result);
          break;
        default:
          break;
      }

      if (result.success) {
        return calculateTotal(prev, result.value);
      }

      return prev;
    },
    { first: 0, last: 0, total: 0 }
  )
);

console.log(
  lines,
  lines.reduce((prev, curr) => prev + curr.total, 0)
);
