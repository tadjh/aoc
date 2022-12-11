// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
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
  headPos: [number, number],
  tailPos: [number, number],
  initalPos: [number, number]
) {
  let print = "";
  for (let i = 0; i < bridge.length; i++) {
    for (let j = 0; j < bridge[i].length; j++) {
      if (i === headPos[0] && j === headPos[1]) {
        print += "H";
        continue;
      }
      if (i === tailPos[0] && j === tailPos[1]) {
        print += "T";
        continue;
      }
      if (i === initalPos[0] && j === initalPos[1]) {
        print += "s";
        continue;
      }
      print += bridge[i][j];
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
  return headPos[0] + 1 === tailPos[0] && Math.abs(headPos[1] - tailPos[1]) < 2;
}

function checkRight(headPos: [number, number], tailPos: [number, number]) {
  return headPos[1] - 1 === tailPos[1] && Math.abs(headPos[0] - tailPos[0]) < 2;
}

function checkDown(headPos: [number, number], tailPos: [number, number]) {
  return headPos[0] - 1 === tailPos[0] && Math.abs(headPos[1] - tailPos[1]) < 2;
}

function checkLeft(headPos: [number, number], tailPos: [number, number]) {
  return headPos[1] + 1 === tailPos[1] && Math.abs(headPos[0] - tailPos[0]) < 2;
}

function isSamePosition(headPos: [number, number], tailPos: [number, number]) {
  return headPos[0] === tailPos[0] && headPos[1] === tailPos[1];
}

function isAdjacent(headPos: [number, number], tailPos: [number, number]) {
  if (checkUp(headPos, tailPos)) return true;
  if (checkRight(headPos, tailPos)) return true;
  if (checkDown(headPos, tailPos)) return true;
  if (checkLeft(headPos, tailPos)) return true;
  return false;
}

const visited = new Set<string>();

function getNextTail(
  dir: "U" | "R" | "D" | "L",
  headPos: [number, number]
): [number, number] {
  switch (dir) {
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

function moveTail(
  dir: "U" | "R" | "D" | "L",
  headPos: [number, number],
  tailPos: [number, number]
): [number, number] {
  if (isSamePosition(headPos, tailPos)) return tailPos;
  if (isAdjacent(headPos, tailPos)) return tailPos;
  return getNextTail(dir, headPos);
}

function formatPrint(
  bridge: string[][],
  headPos: [number, number],
  tailPos: [number, number]
) {
  visited.add("" + tailPos[0] + "-" + tailPos[1]);
  const initalPos: [number, number] = [...headPos];
  let print = "== Initial State ==\r\n\r\n";
  print += formatBridge(bridge, headPos, tailPos, initalPos);
  for (const [dir, steps] of lines) {
    print += "== " + dir + " " + steps + " ==\r\n\r\n";
    for (let i = 0; i < parseInt(steps); i++) {
      switch (dir) {
        case "U": {
          headPos = moveUp(headPos);
          break;
        }
        case "R": {
          headPos = moveRight(headPos);
          break;
        }
        case "D": {
          headPos = moveDown(headPos);
          break;
        }
        case "L": {
          headPos = moveLeft(headPos);
          break;
        }
      }
      tailPos = moveTail(dir, headPos, tailPos);
      print += formatBridge(bridge, headPos, tailPos, initalPos);
    }
  }
  return print;
}

const output = formatPrint(bridge, [4, 0], [4, 0]);

await Deno.writeTextFileSync("input-output.txt", output);

console.log(visited.size);
