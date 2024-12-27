// deno run --watch --allow-all b.ts

import { Parser } from "./parser.ts";

const input = await Deno.readTextFile("input.txt");

const board = new Parser(input, "MAS", "crossmark");
const output = board.print();

await Deno.writeTextFile("output.b.txt", output);
