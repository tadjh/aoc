// deno run --watch --allow-all b.ts

export {};
const input = await Deno.readTextFile("input.txt");
const lines = input.split("\r\n").map((line) => line.match(/[+,-]?(\w+)/g)) as [
  string,
  string,
  string | undefined
][];

const registers: { [ley: string]: number } = {
  a: 1,
  b: 0,
};

let step = 0;

function main(commands: [string, string, string | undefined][]) {
  while (step < commands.length) {
    // console.log(step, commands[step]);

    switch (commands[step][0]) {
      case "hlf":
        registers[commands[step][1]] *= 0.5;
        break;
      case "tpl":
        registers[commands[step][1]] *= 3;
        break;
      case "inc":
        registers[commands[step][1]] += 1;
        break;
      case "jmp":
        step += parseInt(commands[step][1]);
        continue;
      case "jie":
        if (registers[commands[step][1]] % 2 === 0) {
          step += parseInt(commands[step][2]!);
          continue;
        }
        break;
      case "jio":
        if (registers[commands[step][1]] === 1) {
          step += parseInt(commands[step][2]!);
          continue;
        }
        break;
      default:
        return 0;
    }

    step++;
  }
}

main(lines);

console.log(registers);
