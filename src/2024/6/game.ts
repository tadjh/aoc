enum Direction {
  North = "^",
  East = ">",
  South = "V",
  West = "<",
}

class Vector2 {
  public x: number;
  public y: number;
  constructor(x?: number, y?: number) {
    this.x = x !== undefined ? x : -1;
    this.y = y !== undefined ? y : -1;
  }

  update(x: number, y: number): Vector2 {
    this.x = x;
    this.y = y;
    return this;
  }
}

export class Game {
  private state: string;
  private position = new Vector2();
  private direction: Direction = Direction.North;
  private width = 0;
  private height = 0;
  private obstacles: Vector2[] = [];
  private uniqueVisits = 0;
  private visited: [Vector2, Direction][] = [];
  private filename: string;
  private frameDuration = 1000 / 30;
  private lastFrameTime = Date.now();
  private options: { print?: boolean; step?: boolean } = {};

  constructor(
    input: string,
    filename: string,
    options: { print?: boolean; fps?: number } = {}
  ) {
    this.state = input;
    this.filename = filename;
    this.options = options;
    this.frameDuration = options.fps ? 1000 / options.fps : this.frameDuration;

    let x = 0;
    for (let i = 0; i < this.state.length; i++) {
      if (this.height < 1) {
        this.width++;
      }

      switch (input[i]) {
        case "\n":
          this.height++;
          x = 0;
          continue;
        case "#":
          this.obstacles.push(new Vector2(x, this.height));
          break;
        case "^":
          this.position.update(x, this.height);
          this.direction = Direction.North;
          break;
        case ">":
          this.position.update(x, this.height);
          this.direction = Direction.East;
          break;
        case "V":
          this.position.update(x, this.height);
          this.direction = Direction.South;
          break;
        case "<":
          this.position.update(x, this.height);
          this.direction = Direction.West;
          break;
        case ".":
        case "X":
          break;
        default:
          console.log(`Unhandled character: ${input[i]} at ${i}`);
      }

      x++;
    }

    // last row doesn't contain a new line char so we increment manually
    this.height++;
    this.uniqueVisits++;

    // console.log("Initial position", this.position);

    // console.log(this.obstacles);
  }

  public getState() {
    return this.state;
  }

  private nextCoords(): Vector2 {
    const coords = new Vector2();
    switch (this.direction) {
      case Direction.North:
        return coords.update(this.position.x, this.position.y - 1);
      case Direction.East:
        return coords.update(this.position.x + 1, this.position.y);
      case Direction.South:
        return coords.update(this.position.x, this.position.y + 1);
      case Direction.West:
        return coords.update(this.position.x - 1, this.position.y);
      default:
        throw new Error("Invalid Direction");
    }
  }

  private checkCollision(coords: Vector2) {
    for (let i = 0; i < this.obstacles.length; i++) {
      if (
        this.obstacles[i].x === coords.x &&
        this.obstacles[i].y === coords.y
      ) {
        return true;
      }
    }
    return false;
  }

  private getByCoords(position: Vector2) {
    const pos = position.y * this.width + position.x;
    if (pos < 0 || pos >= this.state.length || position.x === this.width - 1) {
      throw new Error("Index out of bounds");
    }
    return this.state[pos];
  }

  private setByCoords(char: string, position: Vector2) {
    const pos = position.y * this.width + position.x;
    if (pos < 0 || pos >= this.state.length || position.x === this.width - 1) {
      throw new Error("Index out of bounds");
    }
    this.state = this.state.slice(0, pos) + char + this.state.slice(pos + 1);
  }

  private rotate() {
    switch (this.direction) {
      case Direction.North:
        this.direction = Direction.East;
        this.setByCoords(Direction.East, this.position);
        break;
      case Direction.East:
        this.direction = Direction.South;
        this.setByCoords(Direction.South, this.position);
        break;
      case Direction.South:
        this.direction = Direction.West;
        this.setByCoords(Direction.West, this.position);
        break;
      case Direction.West:
        this.direction = Direction.North;
        this.setByCoords(Direction.North, this.position);
        break;
      default:
        throw new Error("Invalid direction");
    }

    return true;
  }

  private move(next: Vector2) {
    try {
      const char = this.getByCoords(next);

      if (char !== "X") {
        this.uniqueVisits++;
      }

      this.setByCoords(this.direction, next);
      this.position.update(next.x, next.y);
    } catch (error) {
      return error as Error;
    }
  }

  private mark() {
    this.setByCoords("X", this.position);
  }

  private chart(didRotate: boolean) {
    if (didRotate) {
      this.setByCoords("+", this.position);
    } else if (
      this.direction === Direction.East ||
      this.direction === Direction.West
    ) {
      this.setByCoords("-", this.position);
    } else if (
      this.direction === Direction.North ||
      this.direction === Direction.South
    ) {
      this.setByCoords("|", this.position);
    }
  }

  //   private print() {
  //     console.log(`${this.state}\n\n\nVisited: ${this.uniqueVisits}\n`);
  //   }

  public placeObstacle() {
    const next = this.nextCoords();

    // if (this.visited.includes([next]))

    if (!this.checkCollision(next)) {
      this.setByCoords("0", next);
    }
  }

  public async step() {
    const next = this.nextCoords();

    let error;
    if (this.checkCollision(next)) {
      this.rotate();
    } else {
      this.mark();
      error = this.move(next);
    }

    if (this.options.print) {
      // this.print();
      await Deno.writeTextFile(this.filename, this.state);
    }

    if (error) return error;

    await wait(this.frameDuration);
  }

  public async run() {
    const now = Date.now();
    const elapsed = now - this.lastFrameTime;

    let error;
    if (elapsed >= this.frameDuration) {
      this.lastFrameTime = now;

      error = await this.step();
      console.log(`Rendering frame at ${elapsed} ms`);
    }

    if (error) return;

    return setTimeout(
      () => this.run(),
      Math.max(0, this.frameDuration - elapsed)
    );
  }
}

export function wait(duration: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), duration));
}
