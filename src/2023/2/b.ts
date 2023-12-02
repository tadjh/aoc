// deno run --watch --allow-all b.ts

const input = await Deno.readTextFile("input.txt");
const lines = input
  .split("\r\n")
  .map((line) => {
    const [gameText, roundsText] = line.split(":");

    const rounds = roundsText.split(";").map((round) =>
      round.split(",").map((cubes) => {
        const [cubeCount, cubeColor] = cubes.trim().split(" ");
        return [Number(cubeCount), cubeColor] as [
          number,
          "red" | "green" | "blue",
        ];
      })
    );

    const game = Number(gameText.split(" ")[1]);
    return [game, rounds] as [number, [number, "red" | "green" | "blue"][][]];
  })
  .reduce((prev, [, currRounds]) => {
    return prev + calcPower(currRounds);
  }, 0);

function calcPower(rounds: [number, "red" | "green" | "blue"][][]) {
  const max = { red: 0, green: 0, blue: 0 };
  for (let i = 0; i < rounds.length; i++) {
    for (let j = 0; j < rounds[i].length; j++) {
      const [count, color] = rounds[i][j];
      if (max[color] === undefined) continue;
      if (count > max[color]) {
        max[color] = count;
      }
    }
  }
  return max.red * max.green * max.blue;
}

console.log(lines);
