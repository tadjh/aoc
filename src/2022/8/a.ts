// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const lines = input.split("\r\n").map((el) => el.split("")) as string[][];

// console.log(lines);

// const result: boolean[][] = [];

function searchUp(target: number, y: number, x: number): boolean {
  if (y - 1 === -1) return true;
  if (parseInt(lines[y - 1][x]) < target) return searchUp(target, y - 1, x);
  return false;
}

function searchRight(target: number, y: number, x: number): boolean {
  if (x + 1 === lines.length) return true;
  if (parseInt(lines[y][x + 1]) < target) return searchRight(target, y, x + 1);
  return false;
}

function searchDown(target: number, y: number, x: number): boolean {
  if (y + 1 === lines.length) return true;
  if (parseInt(lines[y + 1][x]) < target) return searchDown(target, y + 1, x);
  return false;
}

function searchLeft(target: number, y: number, x: number): boolean {
  if (x - 1 === -1) return true;
  if (parseInt(lines[y][x - 1]) < target) return searchLeft(target, y, x - 1);
  return false;
}

let score = 0;

function isVisible(row = 0, col = 0) {
  for (let i = row; i < lines.length; i++) {
    if (i === 0 || i === lines.length - 1) {
      score += 1;
      return true;
    }
    for (let j = col; j < lines.length; j++) {
      if (j === 0 || j === lines.length - 1) {
        score += 1;
        return true;
      }
      const current = parseInt(lines[i][j]);

      const up = searchUp(current, i, j);

      if (up) {
        score += 1;
        return true;
      }

      const right = searchRight(current, i, j);

      if (right) {
        score += 1;
        return true;
      }

      const down = searchDown(current, i, j);

      if (down) {
        score += 1;
        return true;
      }

      const left = searchLeft(current, i, j);

      if (left) {
        score += 1;
        return true;
      }

      return false;
    }
  }
  return false;
}

lines.map((row, rowIndex) =>
  row.map((_col, colIndex) => isVisible(rowIndex, colIndex))
);

console.log(score);
