// deno run --watch --allow-all b.ts

let memo = "";

function addToLog(add: string) {
  if (memo === "") {
    memo = "label\t\tprev\t\tcurr\t\tvalue\t\tline\t\treport\n";
  }
  memo += add;
}

function checkDirection(report: number[]) {
  if (report.length < 4) {
    // I'm assuming all inputs are length 4+ based on input
    throw new Error("Unhandled");
  }

  const first = report[0];
  const second = report[1];
  const pentaltimate = report.at(-2)!;
  const last = report.at(-1)!;

  let dir = 0;

  if (first !== second) {
    dir = first > second ? dir - 1 : dir + 1;
  }
  if (first !== last) {
    dir = first > last ? dir - 1 : dir + 1;
  }
  if (first !== pentaltimate) {
    dir = first > pentaltimate ? dir - 1 : dir + 1;
  }
  if (second !== pentaltimate) {
    dir = second > pentaltimate ? dir - 1 : dir + 1;
  }
  if (second !== last) {
    dir = second > last ? dir - 1 : dir + 1;
  }
  if (pentaltimate !== last) {
    dir = pentaltimate > last ? dir - 1 : dir + 1;
  }

  return dir;
}

function checkReport(
  report: number[],
  line: number
):
  | { success: true; line: number; report: number[] }
  | undefined
  | {
      success: false;
      error: "Invalid Range";
      prev: number;
      curr: number;
      i: number;
    }
  | {
      success: false;
      error: "Invalid Direction";
      prev: number;
      curr: number;
      i: number;
    } {
  const dir = checkDirection(report);

  if (dir === 0) return undefined;

  const inc = dir > 0;

  for (let i = 1; i < report.length; i++) {
    const prev = report[i - 1];
    const curr = report[i];

    const diff = Math.abs(prev - curr);

    if (1 > diff || diff > 3) {
      addToLog(
        `[RANGE]\t\t${prev}\t\t${curr}\t\t${diff}\t\t${line}\t\t${report}\n`
      );
      return { success: false, error: "Invalid Range", prev, curr, i };
    }

    if ((prev > curr && inc) || (prev < curr && !inc)) {
      addToLog(
        `[DIREC]\t\t${prev}\t\t${curr}\t\t${inc ? "not inc" : "not dec"}\t\t${line}\t\t${report}\n`
      );
      return { success: false, error: "Invalid Direction", prev, curr, i };
    }
  }

  //   addToLog(`[SAFE]\t\t\t\t\t\t\t\t${line}\t\t${report}\n`);
  return { success: true, line, report };
}

const input = await Deno.readTextFile("input.txt");
const output = input.split("\n").reduce((prev, curr, i) => {
  const report = curr.split(" ").map((str) => Number(str));

  const line = i + 1;

  const result = checkReport(report, line);

  if (!result) {
    return prev;
  }

  if (result.success) {
    return prev + 1;
  } else {
    if (result.error === "Invalid Range") {
      const head = report.slice(0, result.i - 1);
      const tail = report.slice(result.i + 1);

      const left = [...head, result.prev, ...tail];
      const dampLeft = checkReport(left, line);

      if (dampLeft?.success) {
        addToLog(
          `[FIXED]\t\t${result.prev}\t\t${result.curr}\t\tleft\t\t${line}\t\t${left}\n`
        );
        return (prev += 1);
      }

      const right = [...head, result.curr, ...tail];
      const dampRight = checkReport(right, line);

      if (dampRight?.success) {
        addToLog(
          `[FIXED]\t\t${result.prev}\t\t${result.curr}\t\tright\t\t${line}\t\t${right}\n`
        );
        return (prev += 1);
      }
    } else if (result.error === "Invalid Direction") {
      if (result.i < 2) {
        const head = report.slice(0, result.i - 1);
        const tail = report.slice(result.i + 1);

        const left = [...head, result.prev, ...tail];

        const dampLeft = checkReport(left, line);

        if (dampLeft?.success) {
          addToLog(
            `[FIXED]\t\t${result.prev}\t\t${result.curr}\t\tleft\t\t${line}\t\t${left}\n`
          );
          return (prev += 1);
        }

        const right = [...head, result.curr, ...tail];

        const dampRight = checkReport(right, line);

        if (dampRight?.success) {
          addToLog(
            `[FIXED]\t\t${result.prev}\t\t${result.curr}\t\tright\t\t${line}\t\t${right}\n`
          );
          return (prev += 1);
        }
      } else {
        const head = report.slice(0, result.i - 2);
        const tail = report.slice(result.i + 1);

        const left = [...head, result.prev, result.curr, ...tail];

        const dampLeft = checkReport(left, line);
        if (dampLeft?.success) {
          addToLog(
            `[FIXED]\t\t${result.prev}\t\t${result.curr}\t\tleft\t\t${line}\t\t${left}\n`
          );
          return (prev += 1);
        }

        const middle = [...head, report[result.i - 2], result.curr, ...tail];

        const dampMiddle = checkReport(middle, line);

        if (dampMiddle?.success) {
          addToLog(
            `[FIXED]\t\t${result.prev}\t\t${result.curr}\t\tmiddle\t\t${line}\t\t${middle}\n`
          );
          return (prev += 1);
        }

        const right = [...head, report[result.i - 2], result.prev, ...tail];

        const dampRight = checkReport(right, line);

        if (dampRight?.success) {
          addToLog(
            `[FIXED]\t\t${result.prev}\t\t${result.curr}\t\tright\t\t${line}\t\t${right}\n`
          );
          return (prev += 1);
        }
      }
    }

    // const damp = checkReport(report, i + 1);
  }

  return prev;
}, 0);

// console.log(memo);
console.log(output);
