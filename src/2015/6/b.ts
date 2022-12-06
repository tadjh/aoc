// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const lines = input.split("\r\n").map((line) => {
  const prev = line.split(" ");
  if (prev.length === 4) {
    const coords0 = prev[1].split(",").map((el) => parseFloat(el));
    const coords1 = prev[3].split(",").map((el) => parseFloat(el));
    return [prev[0], coords0, coords1];
  }
  const coords0 = prev[2].split(",").map((el) => parseFloat(el));
  const coords1 = prev[4].split(",").map((el) => parseFloat(el));
  return [prev[1], coords0, coords1];
}) as ["on" | "off" | "toggle", [number, number], [number, number]][];

const size = 1000;
const grid: number[][] = Array.from(Array(size), () => Array(size).fill(0));

let count = 0;

function turnOn([x0, y0]: [number, number], [x1, y1]: [number, number]) {
  for (let i = y0; i < y1 + 1; i++) {
    for (let j = x0; j < x1 + 1; j++) {
      grid[i][j] += 1.0;
    }
  }
}

function turnOff([x0, y0]: [number, number], [x1, y1]: [number, number]) {
  for (let i = y0; i < y1 + 1; i++) {
    for (let j = x0; j < x1 + 1; j++) {
      grid[i][j] = Math.max(0, grid[i][j] - 1);
    }
  }
}

function toggle([x0, y0]: [number, number], [x1, y1]: [number, number]) {
  for (let i = y0; i < y1 + 1; i++) {
    for (let j = x0; j < x1 + 1; j++) {
      grid[i][j] += 2;
    }
  }
}

const lookup = {
  on: (coords0: [number, number], coords1: [number, number]) =>
    turnOn(coords0, coords1),
  off: (coords0: [number, number], coords1: [number, number]) =>
    turnOff(coords0, coords1),
  toggle: (coords0: [number, number], coords1: [number, number]) =>
    toggle(coords0, coords1),
};

for (const line of lines) {
  lookup[line[0]](line[1], line[2]);
}

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    const element = grid[i][j];
    count += element;
  }
}

console.log(count);
