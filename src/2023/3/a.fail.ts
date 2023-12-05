// deno run --watch --allow-all a.ts

const input = await Deno.readTextFile("input.txt");
const output = input
  .split("\r\n")
  .map((line) => line.split(""))
  .reduce((prev, curr, rowIndex, arr) => {
    const nums = getNumbers(curr);
    if (!nums.length) {
      return prev;
    }

    return (
      prev +
      nums.reduce((p, c) => {
        for (let i = c.start; i < c.end + 1; i++) {
          if (checkForSymbol(rowIndex, i, arr)) {
            if (rowIndex === 30) {
              console.log(c.value);
            }
            return p + c.value;
          }
        }
        return p;
      }, 0)
    );
  }, 0);

console.log(output);

function checkForSymbol(row: number, col: number, arr: string[][]) {
  // right
  if (col + 1 < arr[0].length) {
    if (isSymbol(arr[row][col + 1])) {
      return true;
    }
  }

  // left
  if (col > 0) {
    if (isSymbol(arr[row][col - 1])) {
      return true;
    }
  }

  // top
  if (row > 0) {
    // top left
    if (col > 0) {
      if (isSymbol(arr[row - 1][col - 1])) {
        return true;
      }
    }

    // above
    if (isSymbol(arr[row - 1][col])) {
      return true;
    }

    // top right
    if (col + 1 < arr[0].length) {
      if (isSymbol(arr[row - 1][col + 1])) {
        return true;
      }
    }
  }

  // bot
  if (row < arr.length - 1) {
    // bot right
    if (col < arr[0].length - 1) {
      if (isSymbol(arr[row + 1][col + 1])) {
        return true;
      }
    }

    // below
    if (isSymbol(arr[row + 1][col])) {
      return true;
    }

    /// bot left
    if (col > 0) {
      if (isSymbol(arr[row + 1][col - 1])) {
        return true;
      }
    }
  }

  return false;
}

function isSymbol(text: string) {
  return text !== "." && isNaN(parseInt(text));
}

function isNumber(text: string) {
  return !isNaN(parseInt(text));
}

function getNumbers(line: string[], start = -1) {
  let num = "";
  let end = start;
  const result = [];
  for (let i = 0; i < line.length; i++) {
    if (isNumber(line[i])) {
      if (start === -1) {
        start = i;
      }
      end = i;
      num += line[i];
      continue;
    }

    if (num) {
      result.push({ start, end, value: parseInt(num) });
      num = "";
      start = -1;
      end = -1;
    }
  }

  return result;
}
