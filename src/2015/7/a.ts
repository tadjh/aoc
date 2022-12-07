// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const lines = input.split("\r\n").map((line) => line.split(" ")) as string[][];

// console.log(lines);

const action: { [key: string]: (a: number, b: number) => number } = {
  AND: (a: number, b: number) => a & b,
  OR: (a: number, b: number) => a | b,
  LSHIFT: (a: number, b: number) => a << b,
  RSHIFT: (a: number, b: number) => a >> b,
};

const NOT = (a: number) => ~a;

function findLine(letter: string) {
  let arr = [""];

  for (const [i, line] of lines.entries()) {
    if (line[line.length - 1] === letter) {
      lines.splice(i, 1);
      arr = line;
    }
  }
  return arr;
}

function getWire(
  letter: string,
  wires: { [key: string]: number } = {}
): number {
  if (wires[letter] !== undefined) return wires[letter];

  const line = findLine(letter);

  // console.log(line);

  if (!line) return -1;

  if (line[0] === "NOT")
    return (wires[letter] = 65536 + NOT(getWire(line[1], wires)));

  if (line[1] === "->")
    return (wires[letter] = isNaN(parseInt(line[0]))
      ? getWire(line[0], wires)
      : parseInt(line[0]));

  if (line[1] === "LSHIFT" || line[1] === "RSHIFT")
    return (wires[letter] = action[line[1]](
      getWire(line[0], wires),
      parseInt(line[2])
    ));

  if (line[1] === "AND" || line[1] === "OR")
    return (wires[letter] = action[line[1]](
      isNaN(parseInt(line[0])) ? getWire(line[0], wires) : parseInt(line[0]),
      isNaN(parseInt(line[2])) ? getWire(line[2], wires) : parseInt(line[2])
    ));

  console.log(letter, line);

  return -1;
}

const output = getWire("a");

console.log(output);
