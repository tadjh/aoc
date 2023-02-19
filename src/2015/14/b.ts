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
  private points: number;

  constructor(name: string, speed: number, duration: number, rest: number) {
    this.name = name;
    this.speed = speed;
    this.duration = duration;
    this.rest = rest;
    this.distance = 0;
    this.cooldown = -1;
    this.flight = 0;
    this.elapsed = 0;
    this.points = 0;
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

  setPoints() {
    return this.points++;
  }

  getPoints() {
    return this.points;
  }
}

function getWinner(reindeers: Reindeer[]) {
  let winner = 0;
  for (const reindeer of reindeers) {
    winner = Math.max(winner, reindeer.getPoints());
  }
  return winner;
}

const end = 2503;
const reindeers: Reindeer[] = [];

for (const reindeer of lines) {
  reindeers.push(new Reindeer(...reindeer));
}

function loop(elapsed: number, distance = 0): number {
  ++elapsed;
  if (elapsed > end) return getWinner(reindeers);
  let winners: Reindeer[] = [];

  for (const reindeer of reindeers) {
    reindeer.move();
    if (reindeer.getDistance() > distance) {
      winners = [reindeer];
      distance = reindeer.getDistance();
    } else if (reindeer.getDistance() === distance) {
      winners.push(reindeer);
    }
  }

  winners.forEach((reindeer) => {
    reindeer.setPoints();
  });

  return loop(elapsed);
}

console.log(loop(0));
