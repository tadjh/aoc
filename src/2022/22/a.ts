// deno run --watch --allow-all a.ts

type Position = [number, number];
type Facing = 0 | 1 | 2 | 3;
type FacingChar = ">" | "<" | "^" | "v";
type BoardChar = " " | "#" | "." | FacingChar;
type Board = BoardChar[][];
type Turn = "R" | "L";
type Path = (number | Turn)[];

export {};
const input = await Deno.readTextFile("input.txt");
const [boardString, pathString] = input.split("\n\n") as string[];

const board = boardString.split("\n").map((el) => el.split("")) as Board;

function parsePath(str: string) {
  let pointer = 0;
  let path: Path = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "R" || str[i] === "L") {
      path = [...path, parseInt(str.slice(pointer, i)), str[i] as Turn];
      pointer = i + 1;
      continue;
    }

    if (i + 1 === str.length) {
      path = [...path, parseInt(str.slice(pointer, i + 1))];
      break;
    }
  }
  return path;
}

function getStart(board: string[][], row = 0): number {
  for (let i = 0; i < board[row].length; i++) {
    if (board[row][i] === ".") return i;
  }
  return -1;
}

function getFacingChar(heading: 0 | 1 | 2 | 3): FacingChar {
  switch (heading) {
    case 0:
      return ">";
    case 1:
      return "v";
    case 2:
      return "<";
    case 3:
      return "^";
    default:
      throw Error("Shouldn't get here");
  }
}

function searchFromLeft(
  [row]: Position,
  board: Board
): false | [Position, Board] {
  for (let i = 0; i < board[row].length; i++) {
    if (board[row][i] === "#") return false;
    if (board[row][i] === ".") {
      board[row][i] = ">";
      return [[row, i], board];
    }
  }
  return false;
}

function searchFromTop(
  [, col]: Position,
  board: Board
): false | [Position, Board] {
  for (let i = 0; i < board.length; i++) {
    if (board[i][col] === "#") return false;
    if (board[i][col] === ".") {
      board[i][col] = "v";
      return [[i, col], board];
    }
  }
  return false;
}

function searchFromRight(
  [row]: Position,
  board: Board
): false | [Position, Board] {
  for (let i = board[row].length - 1; i > 0; i--) {
    if (board[row][i] === "#") return false;
    if (board[row][i] === ".") {
      board[row][i] = "<";
      return [[row, i], board];
    }
  }
  return false;
}

function searchFromBottom(
  [, col]: Position,
  board: Board
): false | [Position, Board] {
  for (let i = board.length - 1; i > 0; i--) {
    if (board[i][col] === "#") return false;
    if (board[i][col] === ".") {
      board[i][col] = "^";
      return [[i, col], board];
    }
  }
  return false;
}

function handleWrap(
  pos: Position,
  facing: Facing,
  board: Board
): false | [Position, Board] {
  switch (facing) {
    case 0:
      return searchFromLeft(pos, board);
    case 1:
      return searchFromTop(pos, board);
    case 2:
      return searchFromRight(pos, board);
    case 3:
      return searchFromBottom(pos, board);
    default:
      break;
  }
  return false;
}

function move(
  [row, col]: Position,
  facing: Facing,
  board: Board
): false | [Position, Board] {
  if (
    board[row] === undefined ||
    board[row][col] === undefined ||
    board[row][col] === " "
  ) {
    return handleWrap([row, col], facing, board);
  }
  if (board[row][col] === "#") return false;
  board[row][col] = getFacingChar(facing);
  return [[row, col], board];
}

function handleMove(
  [row, col]: Position,
  facing: Facing,
  board: Board
): false | [Position, Board] {
  switch (facing) {
    case 0:
      return move([row, col + 1], facing, board);
    case 1:
      return move([row + 1, col], facing, board);
    case 2:
      return move([row, col - 1], facing, board);
    case 3:
      return move([row - 1, col], facing, board);
    default:
      break;
  }
  return false;
}

function handleFacing(
  turn: Turn,
  [row, col]: Position,
  facing: Facing,
  board: Board
): [Facing, Board] {
  switch (facing) {
    case 0:
      if (turn === "R") {
        facing = 1;
        break;
      }
      facing = 3;
      break;
    case 1:
      if (turn === "R") {
        facing = 2;
        break;
      }
      facing = 0;
      break;
    case 2:
      if (turn === "R") {
        facing = 3;
        break;
      }
      facing = 1;
      break;
    case 3:
      if (turn === "R") {
        facing = 0;
        break;
      }
      facing = 2;
      break;
    default:
      break;
  }
  board[row][col] = getFacingChar(facing);
  return [facing, board];
}

let i = 0;

function runPath(path: Path, board: Board): [Position, Facing, Board] {
  let facing: Facing = 0;
  let pos: Position = [0, getStart(board)];
  board[pos[0]][pos[1]] = getFacingChar(facing);

  for (const turn of path) {
    console.log("path", turn);
    if (turn === "R" || turn === "L") {
      const [nextHeading, nextBoard] = handleFacing(turn, pos, facing, board);
      facing = nextHeading;
      board = nextBoard;
      // console.log(formatBoard(board));
      continue;
    }

    for (let i = 0; i < turn; i++) {
      const next = handleMove(pos, facing, board);
      if (next === false) break;
      pos = next[0];
      board = next[1];
    }
    // console.log(formatBoard(board));
    i++;
  }
  return [pos, facing, board];
}

function formatBoard(board: string[][]) {
  let output = "\r\n";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      output += board[i][j];
    }
    output += "\n";
  }
  return output;
}

const path = parsePath(pathString);

const [pos, heading, finalBoard] = runPath(path, board);

console.log(formatBoard(finalBoard));

function getScore([row, col]: Position, heading: Facing) {
  return 1000 * (row + 1) + 4 * (col + 1) + heading;
}

console.log(getScore(pos, heading));
