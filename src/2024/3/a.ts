// deno run --watch --allow-all a.ts

import { Interpreter } from "./interpreter.ts";
import { Lexer, Token } from "./lexer.ts";
import { Parser } from "./parser.ts";

const input = await Deno.readTextFile("input.txt");

const lexer = new Lexer(input);
const tokens: Token[] = lexer.parseAll();

console.log("Tokens:", tokens);

const parser = new Parser(tokens);
const asts = parser.parseAll();

console.log("ASTs:", JSON.stringify(asts, null, 2));

const interpreter = new Interpreter(asts);
const totalResult = interpreter.evaluateAll();
console.log("Total Result of All Evaluations:", totalResult);
