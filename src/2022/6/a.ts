// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const buffer = input.split("") as string[];

// console.log(buffer);

let output = 0;

for (let i = 0; i < buffer.length - 3; i++) {
  if (output !== 0) break;
  const set = new Set<string>(buffer[i]);
  for (let j = i + 1; j < i + 5; j++) {
    if (set.has(buffer[j])) break;
    set.add(buffer[j]);
    if (set.size === 4) {
      output = i + 4;
      break;
    }
  }
}

console.log(output);
