// deno run --watch --allow-all a.ts

import { Parser } from "./parser.ts";

// horizontal, vertical, diagonal, written backwards, or even overlapping other words

const input = await Deno.readTextFile("input.txt");
// const output = input.split("\n").map((line) => line.split(""));

const board = new Parser(input);
const output = board.print();

await Deno.writeTextFile("output.txt", output);

// console.log(output);
