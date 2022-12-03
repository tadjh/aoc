export {};
const input = await Deno.readTextFile("input.txt");

const rounds = input.split("\r\n").map((el) => el.split(" ")) as [
  "A" | "B" | "C",
  "X" | "Y" | "Z"
][];

const score = {
  X: (vs: string) =>
    vs === "A" ? 3 + 1 : vs === "B" ? 0 + 1 : vs === "C" ? 6 + 1 : 0,
  Y: (vs: string) =>
    vs === "A" ? 6 + 2 : vs === "B" ? 3 + 2 : vs === "C" ? 0 + 2 : 0,
  Z: (vs: string) =>
    vs === "A" ? 0 + 3 : vs === "B" ? 6 + 3 : vs === "C" ? 3 + 3 : 0,
};

let result = 0;

for (let i = 0; i < rounds.length; i++) {
  const [p1, p2] = rounds[i];
  result += score[p2](p1);
}

console.log(result);

// Rock defeats Scissors
// Scissors defeats Paper
// Paper defeats Rock

// rock A X 1
// paper B Y 2
// scissors C Z 3
// lost 0
// draw 3
// win 6
