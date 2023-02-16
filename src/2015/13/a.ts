// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const guests = new Set<string>();
const lines = input.split("\r\n").map((line) => {
  const data = line.split(" ");
  data[10] = data[10].replace(/\.$/, "");
  guests.add(data[0]);
  return data;
}) as string[][];

const guestArray = Array.from(guests);

function findHappiness(guest: string, left: string, right: string): number {
  let happiness = 0;
  for (const line of lines) {
    if (line[0] === guest && (line[10] === left || line[10] === right)) {
      if (line[2] === "gain") {
        happiness += parseInt(line[3]);
      } else if (line[2] === "lose") {
        happiness -= parseInt(line[3]);
      }
    }
  }
  // console.log(guest, happiness);
  return happiness;
}

function score(guestArray: string[]) {
  let totalHappiness = 0;
  for (let i = 0; i < guestArray.length; i++) {
    const guest = guestArray[i];
    const left =
      i === 0 ? guestArray[guestArray.length - 1] : guestArray[i - 1];
    const right =
      i === guestArray.length - 1 ? guestArray[0] : guestArray[i + 1];
    // console.log(left, "<", guest, ">", right);
    totalHappiness += findHappiness(guest, left, right);
  }
  return totalHappiness;
}

function getCombinations(inputArr: string[]) {
  const result: string[][] = [];
  function permute(arr: string[], memo: string[] = []) {
    if (arr.length === 0) return result.push(memo);
    for (let i = 0; i < arr.length; i++) {
      const curr = arr.slice();
      const next = curr.splice(i, 1);
      permute(curr.slice(), memo.concat(next));
    }
  }
  permute(inputArr);
  return result;
}

const combinations = getCombinations(guestArray);

let total = 0;

for (let i = 0; i < combinations.length; i++) {
  total = Math.max(total, score(combinations[i]));
}

console.log(total);
