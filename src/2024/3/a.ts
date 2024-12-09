// deno run --watch --allow-all a.ts

import { Interpreter } from "./interpreter.ts";
import { Lexer, Token, TokenType } from "./lexer.ts";
import { Parser } from "./parser.ts";

const input = await Deno.readTextFile("input.txt");

const lexer = new Lexer(input);
const tokens: Token[] = [];
let token: Token;

do {
  token = lexer.nextToken();
  tokens.push(token);
} while (token.type !== TokenType.EOF);

console.log("Tokens:", tokens);

const parser = new Parser(tokens);
const asts = parser.parseAll();

console.log("ASTs:", JSON.stringify(asts, null, 2));

const interpreter = new Interpreter();
const totalResult = interpreter.evaluateAll(asts);
console.log("Total Result of All Evaluations:", totalResult);
