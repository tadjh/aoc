import * as fs from "fs";
fs.readFile("input.txt", (err, res) => {
  const input = res.toString();
  const arr = input.split("\r\n");
  let output: number[] = [];
  let current = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "" || i === arr.length - 1) {
      if (i === arr.length - 1) {
        current += parseInt(arr[i]);
      }

      output.push(current);
      current = 0;
      continue;
    }

    current += parseInt(arr[i]);
  }

  output.sort((a, b) => b - a);
  console.log(output[0] + output[1] + output[2]);
});
