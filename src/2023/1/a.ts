// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const lines = (input.split("\r\n") as string[]).map((line) =>
  line.split("").reduce(
    (prev, curr) => {
      const currInt = parseInt(curr);
      if (!isNaN(currInt)) {
        if (!prev.first) {
          return {
            ...prev,
            first: currInt * 10,
            last: currInt,
            total: currInt * 10 + currInt,
          };
        }
        return { ...prev, last: currInt, total: prev.first + currInt };
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
