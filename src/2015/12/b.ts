// deno run --watch --allow-all b.ts
export {};

const input = await Deno.readTextFile("input.json");
const inputParsed = JSON.parse(input);

function sumArray(nums: (number | string)[]): number {
  let count = 0;
  for (const num of nums) {
    if (typeof num === "object") {
      if (Array.isArray(num)) {
        count += sumArray(num);
      } else {
        count += sumObj(num) ?? 0;
      }
    } else if (typeof num === "string") {
      continue;
    } else {
      count += num;
    }
  }
  console.log("array", count);
  return count;
}

function sumObj(obj: { [key: string]: any }): number | undefined {
  let count = 0;
  for (const num in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, num)) {
      if (typeof obj[num] === "object") {
        if (Array.isArray(obj[num])) {
          count += sumArray(obj[num]);
        } else {
          count += sumObj(obj[num]) ?? 0;
        }
      } else if (typeof obj[num] === "string") {
        if (obj[num] === "red") return undefined;
      } else {
        count += obj[num];
      }
    }
  }
  console.log("object", count);
  return count;
}

function sumJson(
  items: (number[] | { [key: string]: any } | number | string)[]
): number {
  let count = 0;
  for (const item of items) {
    switch (typeof item) {
      case "object":
        if (Array.isArray(item)) {
          count += sumArray(item);
        } else {
          count += sumObj(item) ?? 0;
        }
        break;
      case "number":
        count += item;
        console.log("number", item);
        break;
      case "string":
        break;
      case "undefined":
        count += 0;
        console.log("undefined", 0);
        break;
      default:
        break;
    }
  }
  return count;
}

console.log("total", sumJson(inputParsed));
