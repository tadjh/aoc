// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("test.txt");
const lines = input.split("\r\n").map((el) => el.split(" ")) as [
  "U" | "R" | "D" | "L",
  string
][];
const size = 5;

const bridge: string[][] = Array.from(Array(size), () =>
  Array(size + 1).fill(".")
);

function formatBridge(
  bridge: string[][],
  knots: number[][],
  initalPos: [number, number]
) {
  let print = "";
  for (let i = 0; i < bridge.length; i++) {
    for (let j = 0; j < bridge[i].length; j++) {
      let visited = false;
      for (let k = 0; k < knots.length; k++) {
        if (i === knots[k][0] && j === knots[k][1]) {
          print += k === 0 ? "H" : k;
          visited = true;
          break;
        }
        // if (i === initalPos[0] && j === initalPos[1]) {
        //   print += "s";
        //   visited = true;
        //   continue;
        // }
      }
      print += visited ? "" : bridge[i][j];
    }
    print += "\r\n";
  }
  print += "\r\n";
  return print;
}

function moveUp(headPos: [number, number]): [number, number] {
  return [headPos[0] - 1, headPos[1]];
}

function moveRight(headPos: [number, number]): [number, number] {
  return [headPos[0], headPos[1] + 1];
}

function moveDown(headPos: [number, number]): [number, number] {
  return [headPos[0] + 1, headPos[1]];
}

function moveLeft(headPos: [number, number]): [number, number] {
  return [headPos[0], headPos[1] - 1];
}

function checkUp(headPos: [number, number], tailPos: [number, number]) {
  return headPos[0] === tailPos[0] - 1 && headPos[1] === tailPos[1];
}

function checkRight(headPos: [number, number], tailPos: [number, number]) {
  return headPos[1] === tailPos[1] + 1 && headPos[0] === tailPos[0];
}

function checkDown(headPos: [number, number], tailPos: [number, number]) {
  return headPos[0] === tailPos[0] + 1 && headPos[1] === tailPos[1];
}

function checkLeft(headPos: [number, number], tailPos: [number, number]) {
  return headPos[1] === tailPos[1] - 1 && headPos[0] === tailPos[0];
}

function checkUpLeft(headPos: [number, number], tailPos: [number, number]) {
  return headPos[0] === tailPos[0] - 1 && headPos[1] === tailPos[1] - 1;
}

function checkUpRight(headPos: [number, number], tailPos: [number, number]) {
  return headPos[0] === tailPos[0] - 1 && headPos[1] === tailPos[1] + 1;
}

function checkDownLeft(headPos: [number, number], tailPos: [number, number]) {
  return headPos[0] === tailPos[0] + 1 && headPos[1] === tailPos[1] - 1;
}

function checkDownRight(headPos: [number, number], tailPos: [number, number]) {
  return headPos[0] === tailPos[0] + 1 && headPos[1] === tailPos[1] + 1;
}

function checkSamePosition(
  headPos: [number, number],
  tailPos: [number, number]
) {
  return headPos[0] === tailPos[0] && headPos[1] === tailPos[1];
}

function checkAdjacent(
  dir: "U" | "R" | "D" | "L" | "UL" | "UR" | "DL" | "DR",
  headPos: [number, number],
  tailPos: [number, number]
): [boolean, "U" | "R" | "D" | "L" | "UL" | "UR" | "DL" | "DR"] {
  if (checkUp(headPos, tailPos)) return [true, "U"];
  if (checkRight(headPos, tailPos)) return [true, "R"];
  if (checkDown(headPos, tailPos)) return [true, "D"];
  if (checkLeft(headPos, tailPos)) return [true, "L"];
  if (checkUpLeft(headPos, tailPos)) return [true, "UL"];
  if (checkUpRight(headPos, tailPos)) return [true, "UR"];
  if (checkDownLeft(headPos, tailPos)) return [true, "DL"];
  if (checkDownRight(headPos, tailPos)) return [true, "DR"];
  return [false, dir];
}

const visited = new Set<string>();

function getNextTail(
  dir: "U" | "R" | "D" | "L" | "UL" | "UR" | "DL" | "DR",
  headPos: [number, number]
): [number, number] {
  switch (dir) {
    case "UL": {
      visited.add("" + (headPos[0] + 1) + "-" + (headPos[1] + 1));
      return [headPos[0] + 1, headPos[1] + 1];
    }
    case "UR": {
      visited.add("" + (headPos[0] + 1) + "-" + (headPos[1] - 1));
      return [headPos[0] + 1, headPos[1] - 1];
    }
    case "DL": {
      visited.add("" + (headPos[0] - 1) + "-" + (headPos[1] + 1));
      return [headPos[0] - 1, headPos[1] + 1];
    }
    case "DR": {
      visited.add("" + (headPos[0] - 1) + "-" + (headPos[1] - 1));
      return [headPos[0] - 1, headPos[1] - 1];
    }
    case "U": {
      visited.add("" + (headPos[0] + 1) + "-" + headPos[1]);
      return [headPos[0] + 1, headPos[1]];
    }
    case "R": {
      visited.add("" + headPos[0] + "-" + (headPos[1] - 1));
      return [headPos[0], headPos[1] - 1];
    }
    case "D": {
      visited.add("" + (headPos[0] - 1) + "-" + headPos[1]);
      return [headPos[0] - 1, headPos[1]];
    }
    case "L": {
      visited.add("" + headPos[0] + "-" + (headPos[1] + 1));
      return [headPos[0], headPos[1] + 1];
    }
    default:
      return [-1, -1];
  }
}

function moveHead(dir: string, knots: [number, number][]): [number, number][] {
  switch (dir) {
    case "U": {
      knots[0] = moveUp(knots[0]);
      break;
    }
    case "R": {
      knots[0] = moveRight(knots[0]);
      break;
    }
    case "D": {
      knots[0] = moveDown(knots[0]);
      break;
    }
    case "L": {
      knots[0] = moveLeft(knots[0]);
      break;
    }
  }
  return knots;
}

function moveTails(
  initDir: "U" | "R" | "D" | "L" | "UL" | "UR" | "DL" | "DR",
  knots: [number, number][]
): [number, number][] {
  let nextDir: "U" | "R" | "D" | "L" | "UL" | "UR" | "DL" | "DR" = initDir;
  for (let i = 1; i < knots.length; i++) {
    console.log("knot", i);
    if (checkSamePosition(knots[i - 1], knots[i])) continue;
    const [isAdjacent, dir] = checkAdjacent(nextDir, knots[i - 1], knots[i]);
    if (isAdjacent) {
      console.log("isAdjacent", dir);
      nextDir = dir;
      continue;
    }
    knots[i] = getNextTail(nextDir, knots[i - 1]);
  }
  return knots;
}

function formatPrint(bridge: string[][], knots: [number, number][]) {
  visited.add("" + knots[0][0] + "-" + knots[0][1]);
  const initalPos: [number, number] = [...knots[0]];
  let print = "== Initial State ==\r\n\r\n";
  print += formatBridge(bridge, knots, initalPos);
  let a = 0;
  for (const [dir, steps] of lines) {
    print += "== " + dir + " " + steps + " ==\r\n\r\n";
    for (let i = 0; i < parseInt(steps); i++) {
      knots = moveHead(dir, knots);
      knots = moveTails(dir, knots);
      print += formatBridge(bridge, knots, initalPos);
    }
    ++a;
    if (a === 2) break;
  }
  return print;
}

let knots: [number, number][] = Array(10).fill([4, 0]);

const output = formatPrint(bridge, knots);

await Deno.writeTextFileSync("test-output2.txt", output);

// console.log(visited.size);
