// deno run --watch --allow-all b.ts

const input = await Deno.readTextFile("input.txt");
const output = input
  .split("\r\n")
  .map((line) => line.split(""))
  .reduce((prev, curr, i, arr) => {
    return (
      prev +
      curr.reduce((p, c, j) => {
        if (isGear(c)) {
          const parts = searchParts(i, j, arr);
          if (parts.length === 2) {
            return p + parts[0] * parts[1];
          }
        }
        return p;
      }, 0)
    );
  }, 0);

console.log(output);

function isDigit(text: string) {
  switch (text) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      return true;
    default:
      return false;
  }
}

function isSymbol(text: string) {
  return !isDigit(text) && text !== ".";
}

function isGear(text: string) {
  return text === "*";
}

function getNumber(row: number, col: number, arr: string[][]) {
  let numStr = "";

  for (let i = 0; i < arr[row].length; i++) {
    if (isDigit(arr[row][i])) {
      numStr += arr[row][i];

      if (
        i > arr[row].length - 1 ||
        (i + 1 > col && (arr[row][i + 1] === "." || isSymbol(arr[row][i + 1])))
      ) {
        return parseInt(numStr);
      }
    } else {
      numStr = "";
    }
  }

  return 0;
}

function searchParts(row: number, col: number, arr: string[][]) {
  const nums = [];

  // left
  if (col > 0 && isDigit(arr[row][col - 1])) {
    nums.push(getNumber(row, col - 1, arr));
  }

  // right
  if (col < arr[0].length - 1 && isDigit(arr[row][col + 1])) {
    nums.push(getNumber(row, col + 1, arr));
  }

  // top
  //   if (row > 0 && isDigit(arr[row - 1][col])) {
  //     nums.push(getNumber(row - 1, col, arr));
  //   }

  // top left
  if (row > 0 && col > 0 && isDigit(arr[row - 1][col - 1])) {
    nums.push(getNumber(row - 1, col - 1, arr));
  }

  // top right
  if (row > 0 && col < arr[0].length - 1 && isDigit(arr[row - 1][col + 1])) {
    nums.push(getNumber(row - 1, col + 1, arr));
  }

  // bottom
  //   if (row < arr.length - 1 && isDigit(arr[row + 1][col])) {
  //     nums.push(getNumber(row + 1, col, arr));
  //   }

  // bottom left
  if (row < arr.length - 1 && col > 0 && isDigit(arr[row + 1][col - 1])) {
    nums.push(getNumber(row + 1, col - 1, arr));
  }

  // bottom right
  if (
    row < arr.length - 1 &&
    col < arr[0].length - 1 &&
    isDigit(arr[row + 1][col + 1])
  ) {
    nums.push(getNumber(row + 1, col + 1, arr));
  }

  return [...new Set(nums)];
}
