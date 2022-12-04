// deno run --watch --allow-all a.ts
import {
  crypto,
  toHashString,
} from "https://deno.land/std@0.167.0/crypto/mod.ts";

export {};
const input = await Deno.readTextFile("input.txt");

let i = 0;
while (true) {
  const hash = await crypto.subtle.digest(
    "MD5",
    new TextEncoder().encode(input + i)
  );

  const a = toHashString(hash);

  if (a.startsWith("000000", 0)) {
    console.log(a, i);
    break;
  }
  i++;
}
