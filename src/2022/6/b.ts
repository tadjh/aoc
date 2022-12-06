// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("test.txt");
const buffer = input.split("") as string[];

// console.log(buffer);

function findMarker(buffer: string[], len: number) {
  let pos = 0;
  for (let i = 0; i < buffer.length - (len - 1); i++) {
    if (pos !== 0) break;
    const set = new Set<string>(buffer[i]);
    for (let j = i + 1; j < i + (len + 1); j++) {
      if (set.has(buffer[j])) break;
      set.add(buffer[j]);
      if (set.size === len) {
        pos = i + len;
        break;
      }
    }
  }
  return pos;
}

console.log(findMarker(buffer, 14));
