// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const lines = input.split("\r\n").map((el) => el.split(" ")) as string[][];

function findStart(name: string, pos: number): number {
  for (let i = pos; i < lines.length; i++) {
    if (lines[i][1] !== "cd" || lines[i][2] !== name) continue;
    return i;
  }
  return -1;
}

function findEnd(pos: number): number {
  for (let i = pos; i < lines.length; i++) {
    if (i + 1 === lines.length) break;
    if (lines[i + 1][1] === "cd") {
      return i;
    }
  }
  return lines.length - 1;
}

function findDirectory(name: string, pos = 0): [string[][], number] {
  const start = findStart(name, pos);
  const end = findEnd(start);
  return [lines.splice(start, end - start + 1), start];
}

function populateDirectory(lines: string[][], pos: number) {
  const name = lines[0][2];
  let dir = { [name]: { size: 0, type: "dir" } };
  for (let i = 2; i < lines.length; i++) {
    if (lines[i][0] === "dir") {
      const child = getDirectory(lines[i][1], pos);
      const size = dir[name].size + child[lines[i][1]].size;
      dir = {
        [name]: {
          ...dir[name],
          ...child,
          size,
        },
      };
      continue;
    }
    const size = parseInt(lines[i][0]);
    dir = {
      [name]: {
        ...dir[name],
        size: dir[name].size + size,
        [lines[i][1]]: { size, type: "file" },
      },
    };
  }
  return dir;
}

function getDirectory(name: string, pos = 0): any {
  return populateDirectory(...findDirectory(name, pos));
}

const dirs = getDirectory("/");

// await Deno.writeTextFileSync("input.json", JSON.stringify(dirs));

let total = 0;

function getScore(dirs: { [x: string]: any }) {
  for (const item in dirs) {
    if (item === "size" && dirs[item] <= 100000) {
      console.log(dirs[item]);
      total += dirs[item];
      continue;
    }

    if (dirs[item].type === "dir") {
      getScore(dirs[item]);
      continue;
    }
  }
}

getScore(dirs);

console.log("total", total);

// console.log(dirs["/"]);
