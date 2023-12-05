// deno run --watch --allow-all a.ts

const input = await Deno.readTextFile("input.txt");
const output = input
  .split("\r\n")
  .map((line) => line.split(""))
  .reduce((prev, curr, i, arr) => {
    let numStr = "";
    let foundSymbol = false;

    return (
      prev +
      curr.reduce((p, c, j, a) => {
        if (isDigit(c)) {
          numStr += c;

          if (hasSymbol(i, j, arr)) {
            foundSymbol = true;
          }

          if (
            (i > a.length - 1 || a[j + 1] === "." || isSymbol(a[j + 1])) &&
            foundSymbol
          ) {
            return p + Number(numStr);
          }
        } else {
          numStr = "";
          foundSymbol = false;
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

function hasSymbol(row: number, col: number, arr: string[][]) {
  switch (true) {
    case col > 0 && isSymbol(arr[row][col - 1]): // left
    case col < arr[0].length - 1 && isSymbol(arr[row][col + 1]): // right
    case row > 0 && isSymbol(arr[row - 1][col]): // top
    case row > 0 && col > 0 && isSymbol(arr[row - 1][col - 1]): // top left
    case row > 0 && col < arr[0].length - 1 && isSymbol(arr[row - 1][col + 1]): // top right
    case row < arr.length - 1 && isSymbol(arr[row + 1][col]): // bottom
    case row < arr.length - 1 && col > 0 && isSymbol(arr[row + 1][col - 1]): // bottom left
    case row < arr.length - 1 &&
      col < arr[0].length - 1 &&
      isSymbol(arr[row + 1][col + 1]): // bottom right
      return true;
    default:
      return false;
  }
}
