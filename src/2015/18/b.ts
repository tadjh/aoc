// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const lights = input.split("\r\n").map((line) => line.split("")) as string[][];

function _printLights(lights: string[][], step = 0) {
  if (step === 0) {
    console.log("Initial state:");
  } else {
    console.log("After %d step:", step);
  }

  for (const row of lights) {
    console.log(row.join(""));
  }

  console.log("\n");
}

function getNeighbors(lights: string[][], row: number, col: number) {
  let neighbors: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ] = [0, 0, 0, 0, 0, 0, 0, 0];

  if (row === 0 && col === 0) {
    // 1 2 3 7 8 undefined
    neighbors = [
      0,
      0,
      0,
      lights[row][col + 1] === "#" ? 1 : 0,
      lights[row + 1][col + 1] === "#" ? 1 : 0,
      lights[row + 1][col] === "#" ? 1 : 0,
      0,
      0,
    ];
  } else if (row === 0 && col === lights.length - 1) {
    // 1 2 3 4 5 undefined
    neighbors = [
      0,
      0,
      0,
      0,
      0,
      lights[row + 1][col] === "#" ? 1 : 0,
      lights[row + 1][col - 1] === "#" ? 1 : 0,
      lights[row][col - 1] === "#" ? 1 : 0,
    ];
  } else if (row === lights.length - 1 && col === lights.length - 1) {
    // 3 4 5 6 7 undefined
    neighbors = [
      lights[row - 1][col - 1] === "#" ? 1 : 0,
      lights[row - 1][col] === "#" ? 1 : 0,
      0,
      0,
      0,
      0,
      0,
      lights[row][col - 1] === "#" ? 1 : 0,
    ];
  } else if (row === lights.length - 1 && col === 0) {
    // 1 5 6 7 8 undefined
    neighbors = [
      0,
      lights[row - 1][col] === "#" ? 1 : 0,
      lights[row - 1][col + 1] === "#" ? 1 : 0,
      lights[row][col + 1] === "#" ? 1 : 0,
      0,
      0,
      0,
      0,
    ];
  } else if (row === 0) {
    // 1 2 3 undefined
    neighbors = [
      0,
      0,
      0,
      lights[row][col + 1] === "#" ? 1 : 0,
      lights[row + 1][col + 1] === "#" ? 1 : 0,
      lights[row + 1][col] === "#" ? 1 : 0,
      lights[row + 1][col - 1] === "#" ? 1 : 0,
      lights[row][col - 1] === "#" ? 1 : 0,
    ];
  } else if (row === lights.length - 1) {
    // 5 6 7 undefined
    neighbors = [
      lights[row - 1][col - 1] === "#" ? 1 : 0,
      lights[row - 1][col] === "#" ? 1 : 0,
      lights[row - 1][col + 1] === "#" ? 1 : 0,
      lights[row][col + 1] === "#" ? 1 : 0,
      0,
      0,
      0,
      lights[row][col - 1] === "#" ? 1 : 0,
    ];
  } else if (col === 0) {
    // 1 7 8 undefined
    neighbors = [
      0,
      lights[row - 1][col] === "#" ? 1 : 0,
      lights[row - 1][col + 1] === "#" ? 1 : 0,
      lights[row][col + 1] === "#" ? 1 : 0,
      lights[row + 1][col + 1] === "#" ? 1 : 0,
      lights[row + 1][col] === "#" ? 1 : 0,
      0,
      0,
    ];
  } else if (col === lights.length - 1) {
    // 3 4 5 undefined
    neighbors = [
      lights[row - 1][col - 1] === "#" ? 1 : 0,
      lights[row - 1][col] === "#" ? 1 : 0,
      0,
      0,
      0,
      lights[row + 1][col] === "#" ? 1 : 0,
      lights[row + 1][col - 1] === "#" ? 1 : 0,
      lights[row][col - 1] === "#" ? 1 : 0,
    ];
  } else {
    neighbors = [
      lights[row - 1][col - 1] === "#" ? 1 : 0,
      lights[row - 1][col] === "#" ? 1 : 0,
      lights[row - 1][col + 1] === "#" ? 1 : 0,
      lights[row][col + 1] === "#" ? 1 : 0,
      lights[row + 1][col + 1] === "#" ? 1 : 0,
      lights[row + 1][col] === "#" ? 1 : 0,
      lights[row + 1][col - 1] === "#" ? 1 : 0,
      lights[row][col - 1] === "#" ? 1 : 0,
    ];
  }

  // console.log(neighbors[0], neighbors[1], neighbors[2]);
  // console.log(neighbors[7], lights[row][col] === "#" ? 1 : 0, neighbors[3]);
  // console.log(neighbors[6], neighbors[5], neighbors[4]);

  return neighbors.reduce((a: number, b: number) => a + b);
}

function updateLights(lights: string[][]) {
  const clone = lights.map((row) => row.slice());
  for (let i = 0; i < lights.length; i++) {
    for (let j = 0; j < lights.length; j++) {
      if (
        (i === 0 && j === 0) ||
        (i === 0 && j === lights.length - 1) ||
        (i === lights.length - 1 && j === lights.length - 1) ||
        (i === lights.length - 1 && j === 0)
      ) {
        continue;
      }

      const count = getNeighbors(lights, i, j);
      if (clone[i][j] === "#" && (count < 2 || count > 3)) {
        clone[i][j] = ".";
      } else if (clone[i][j] === "." && count === 3) {
        clone[i][j] = "#";
      }
    }
  }
  return clone;
}

function countLights(lights: string[][]) {
  let count = 0;
  for (const row of lights) {
    for (const col of row) {
      count += col === "#" ? 1 : 0;
    }
  }
  return count;
}

function main(lights: string[][]) {
  let clone = lights;
  clone[0][0] = "#";
  clone[0][clone.length - 1] = "#";
  clone[clone.length - 1][0] = "#";
  clone[clone.length - 1][clone.length - 1] = "#";
  const steps = 100;
  for (let i = 0; i <= steps; i++) {
    if (i !== 0) {
      clone = updateLights(clone);
    }
    // printLights(clone, i);
  }
  return countLights(clone);
  // return clone;
}

console.log(main(lights));
