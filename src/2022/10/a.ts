// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const commands = input.split("\n") as string[];

// console.log(commands);

let register = 1;
let cycles = 1;
let output = 0;

function run(instruction: string) {
  if (instruction === "noop") return;
  const [, value] = instruction.split(" ");
  register += parseInt(value);
  // console.log(register);
}

function cycle(loops: number, instruction: string) {
  let i = 0;
  while (i < loops) {
    if ((cycles - 20) % 40 === 0) {
      output += cycles * register;
      // console.log(
      //   "cycles",
      //   cycles,
      //   "register",
      //   register,
      //   "value",
      //   cycles * register
      // );
    }
    ++i;
    ++cycles;
    if (i === loops) run(instruction);
  }
}

for (const cmd of commands) {
  switch (cmd) {
    case "noop":
      cycle(1, cmd);
      break;
    default:
      cycle(2, cmd);
  }
}

console.log(output);
