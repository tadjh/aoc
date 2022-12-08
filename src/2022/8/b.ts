// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const lines = input.split("\r\n").map((el) => el.split("")) as string[][];

// console.log(lines);

function searchUp(target: number, y: number, x: number, score = 0): number {
  if (y - 1 === -1) return score;
  if (parseInt(lines[y - 1][x]) < target)
    return searchUp(target, y - 1, x, score + 1);
  return score + 1;
}

function searchRight(target: number, y: number, x: number, score = 0): number {
  if (x + 1 === lines.length) return score;
  if (parseInt(lines[y][x + 1]) < target)
    return searchRight(target, y, x + 1, score + 1);
  return score + 1;
}

function searchDown(target: number, y: number, x: number, score = 0): number {
  if (y + 1 === lines.length) return score;
  if (parseInt(lines[y + 1][x]) < target)
    return searchDown(target, y + 1, x, score + 1);
  return score + 1;
}

function searchLeft(target: number, y: number, x: number, score = 0): number {
  if (x - 1 === -1) return score;
  if (parseInt(lines[y][x - 1]) < target)
    return searchLeft(target, y, x - 1, score + 1);
  return score + 1;
}

let score = 0;

function visibilityScore(row = 0, col = 0): number {
  for (let i = row; i < lines.length; i++) {
    for (let j = col; j < lines.length; j++) {
      const current = parseInt(lines[i][j]);
      const up = searchUp(current, i, j);
      const right = searchRight(current, i, j);
      const down = searchDown(current, i, j);
      const left = searchLeft(current, i, j);
      const value = up * right * down * left;
      score = Math.max(value, score);
      return value;
    }
  }
  return 0;
}

lines.map((row, rowIndex) =>
  row.map((_col, colIndex) => visibilityScore(rowIndex, colIndex))
);

console.log(score);
