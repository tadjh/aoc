// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const arr = input.split("\r\n") as string[];

const naughty = ["ab", "cd", "pq", "xy"];
const vowels = ["a", "e", "i", "o", "u"];

const isNaughtyString = (str: string) => {
  for (const naut of naughty) {
    if (str.includes(naut)) {
      return true;
    }
  }
  return false;
};

const hasDoubleChar = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      return true;
    }
  }
  return false;
};

const hasEnoughVowels = (str: string, max: number) => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    for (const vowel of vowels) {
      if (str[i] === vowel) {
        ++count;
        if (count === max) return true;
      }
    }
  }
  return false;
};

let output = 0;

for (let i = 0; i < arr.length; i++) {
  if (
    !isNaughtyString(arr[i]) &&
    hasDoubleChar(arr[i]) &&
    hasEnoughVowels(arr[i], 3)
  ) {
    output++;
  }
}

console.log(output);
