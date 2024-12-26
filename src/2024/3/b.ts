// deno run --watch --allow-all b.ts

import { Interpreter } from "./interpreter.ts";
import { Lexer } from "./lexer.ts";
import { Parser } from "./parser.ts";

console.log("test");
const input = await Deno.readTextFile("input.txt");

const tokens = new Lexer(input).parseAll();

// await Deno.writeTextFile("lexer.output.txt", JSON.stringify(tokens, null, 2));

const asts = new Parser(tokens).parseAll();

// await Deno.writeTextFile("parser.output.txt", JSON.stringify(asts, null, 2));

const totalResult = new Interpreter(asts).evaluateAll();

console.log("Total Result of All Evaluations:", totalResult);
