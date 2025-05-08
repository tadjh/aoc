// deno run --watch --allow-all a.ts

import { Game } from "./game.ts";

const input = await Deno.readTextFile("test.txt");

const game = new Game(input, "game.txt", { print: true, fps: 6 });

game.run();
