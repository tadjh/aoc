// deno run --watch --allow-all a.ts

export {};

const input = await Deno.readTextFile("input.txt");
const lines = input.split("\r\n").map((el) => {
  const line = el.split(" ");
  return [line[0], parseInt(line[3]), parseInt(line[6]), parseInt(line[13])];
}) as [string, number, number, number][];

class Reindeer {
  private name: string;
  private duration: number;
  private speed: number;
  private rest: number;
  private distance: number;
  private cooldown: number;
  private flight: number;
  private elapsed: number;

  constructor(name: string, speed: number, duration: number, rest: number) {
    this.name = name;
    this.speed = speed;
    this.duration = duration;
    this.rest = rest;
    this.distance = 0;
    this.cooldown = -1;
    this.flight = 0;
    this.elapsed = 0;
  }

  move() {
    this.elapsed++;
    if (this.flight === this.duration) return this.resting();
    this.flight++;
    return this.increaseDistance();
  }

  private increaseDistance() {
    return (this.distance += this.speed);
  }

  private resting() {
    if (this.cooldown > 0) return this.cooldown--;
    if (this.cooldown === 0) {
      this.flight = 1;
      this.cooldown = -1;
      return this.increaseDistance();
    }
    return (this.cooldown = this.rest - 1);
  }

  private status() {
    return this.cooldown > 0 ? "resting" : "flying";
  }

  info() {
    console.log(
      this.name,
      "has travelled",
      this.distance,
      "over a period of",
      this.elapsed,
      "seconds, and is currently",
      this.status()
    );
  }

  getDistance() {
    return this.distance;
  }
}

function getWinner(reindeers: Reindeer[]) {
  let winner = 0;
  for (const reindeer of reindeers) {
    winner = Math.max(winner, reindeer.getDistance());
  }
  return winner;
}

const max = 2503;
let elapsed = 1;
const reindeers: Reindeer[] = [];

for (const reindeer of lines) {
  reindeers.push(new Reindeer(...reindeer));
}

while (elapsed <= max) {
  reindeers.forEach((reindeer) => {
    reindeer.move();
  });
  elapsed++;
}

console.log(getWinner(reindeers));
