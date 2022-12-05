// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const lines = input.split("\r\n") as string[];

function hasPalindrome(line: string) {
  for (let i = 1; i < line.length - 1; i++) {
    if (line[i - 1] === line[i + 1]) {
      return true;
    }
  }
  return false;
}

function hasTwoPairs(line: string) {
  for (let i = 0; i < line.length - 1; i++) {
    const pair = line[i] + line[i + 1];
    for (let j = i + 2; j < line.length - 1; j++) {
      const twin = line[j] + line[j + 1];
      if (pair === twin) {
        return true;
      }
    }
  }
  return false;
}

let output = 0;

for (const line of lines) {
  if (!hasPalindrome(line)) {
    continue;
  }

  if (!hasTwoPairs(line)) {
    continue;
  }

  output++;
}

console.log(output);
