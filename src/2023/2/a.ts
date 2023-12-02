// deno run --watch --allow-all a.ts

export {};

const max = {
  red: 12,
  green: 13,
  blue: 14,
};

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
  .reduce((prev, [currGame, currRounds]) => {
    if (isPossibleGame(currRounds)) {
      return prev + currGame;
    }

    return prev;
  }, 0);

function isPossibleGame(rounds: [number, "red" | "green" | "blue"][][]) {
  return rounds.reduce((prev, curr) => {
    for (let i = 0; i < curr.length; i++) {
      const [count, color] = curr[i];
      if (count <= max[color]) continue;
      return false;
    }
    return prev;
  }, true);
}

console.log(lines);
