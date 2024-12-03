// deno run --watch --allow-all a.ts

const input = await Deno.readTextFile("input.txt");
const output = input.split("\n").reduce((prev, line) => {
  const report = line.split(" ");
  let last = -1;
  let inc = true;

  for (let i = 0; i < report.length; i++) {
    const curr = Number(report[i]);
    if (i === 0 && report.length >= 2) {
      last = curr;
      inc = last < Number(report[i + 1]);
    } else if (inc && last > curr) {
      console.log("stopped increasing", inc, last, curr, "report", line);
      return prev;
    } else if (!inc && last < curr) {
      console.log("stopped decreasing", inc, last, curr, "report", line);
      return prev;
    } else if (Math.abs(last - curr) < 1) {
      console.log("not diff by alteast one", last, curr, "report", line);
      return prev;
    } else if (Math.abs(last - curr) > 3) {
      console.log("diff by more than 3", last, curr, "report", line);
      return prev;
    }
    last = curr;
  }
  console.log("report", line);
  return prev + 1;
}, 0);

console.log(output);
