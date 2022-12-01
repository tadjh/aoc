import * as fs from "fs";
fs.readFile("input.txt", (err, res) => {
  const input = res.toString();
  const arr = input.split("\r\n");
  let output = 0;
  let current = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "" || i === arr.length - 1) {
      output = Math.max(current, output);
      current = 0;
      continue;
    }

    current += parseInt(arr[i]);
  }
  console.log(output);
});
