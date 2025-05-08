// deno run --watch --allow-all b.ts

import { Game, wait } from "./game.ts";

const input = await Deno.readTextFile("test.txt");

let loops = 0;

const game = new Game(input, "game.b.txt", { print: true, fps: 6 });

while (true) {
  try {
    game.step();
    const testGame = new Game(game.getState(), "test.game.b.txt", {
      print: true,
      step: true,
    });
    testGame.placeObstacle();
    testGame.run();

    // place an obstacle
    // rotate
    // get next coords
    //
    // move forward and store visited locations
    // keep moving forward
    // test for a loop
    // if a vector was visited twice we found a loop

    //

    // try {
    //   let error;
    //   const visited: [Vector2, Direction][] = [];
    //   const testState = this.state;

    //   const next = this.nextCoords();
    //   const isCollision = this.checkCollision(next);

    //   if (isCollision) {
    //     didRotate = this.rotate();
    //   } else {
    //     visited.push([this.position, this.direction]);
    //     this.chart(didRotate);
    //     didRotate = false;
    //     error = this.move(next);
    //   }

    // this.print();
    //   await Deno.writeTextFile("game.txt", this.state);

    //   if (error) throw error;

    //   await this.wait(500);
    // } catch (error) {
    // console.log((error as Error).message);
    //   break;
    // }
    // console.log(`Visited: ${this.uniqueVisits}`);
    wait(1000);

    break;
  } catch (error) {}
}
