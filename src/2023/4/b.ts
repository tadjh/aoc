// deno run --watch --allow-all b.ts

const input = await Deno.readTextFile("input.txt");
const output = input.split("\r\n").map((card) =>
  card
    .split(":")[1]
    .split("|")
    .map((nums) =>
      nums
        .trim()
        .split(" ")
        .filter((val) => val !== "")
    )
);

console.log(scoreCards(output));

function getCount(card: string[][]) {
  let count = 0;
  for (let i = 0; i < card[0].length; i++) {
    for (let j = 0; j < card[1].length; j++) {
      if (card[0][i] === card[1][j]) {
        count++;
      }
    }
  }
  return count;
}

function scoreCards(
  cards: string[][][],
  startIdx = 0,
  endIdx = 0,
  memo: Record<number, number> = {},
  depth = 0
) {
  //   const tab = new Array(depth * 4).fill(" ").join("");

  const start = startIdx || 0;
  const end = endIdx || cards.length;

  for (let i = start; i < end; i++) {
    const count = getCount(cards[i]);
    memo[i + 1] = memo[i + 1] ? memo[i + 1] + 1 : 1;
    // console.log(tab, "Card", i + 1, "count", count);

    if (count > 0) {
      scoreCards(cards, i + 1, count + i + 1, memo, depth + 1);
    }
  }

  //   console.log(tab, memo);

  return Object.values(memo).reduce((prev, curr) => prev + curr, 0);
}
