// deno run --watch --allow-all a.ts

const input = await Deno.readTextFile("input.txt");
const output = input
  .split("\r\n")
  .map((card) =>
    card
      .split(":")[1]
      .split("|")
      .map((nums) =>
        nums
          .trim()
          .split(" ")
          .filter((val) => val !== "")
      )
  )
  .reduce((prev, curr) => {
    let count = 0;
    for (let i = 0; i < curr[0].length; i++) {
      for (let j = 0; j < curr[1].length; j++) {
        if (curr[0][i] === curr[1][j]) {
          count++;
        }
      }
    }

    let score = 0;

    for (let k = 0; k < count; k++) {
      if (k === 0) {
        score = 1;
      } else {
        score *= 2;
      }
    }

    return prev + score;
  }, 0);

console.log(output);
