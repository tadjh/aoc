// deno run --watch --allow-all a.ts

export {};

class Ingredient {
  name: string;
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
  calories: number;

  constructor(
    name: string,
    capacity: number,
    durability: number,
    flavor: number,
    texture: number,
    calories: number
  ) {
    this.name = name;
    this.capacity = capacity;
    this.durability = durability;
    this.flavor = flavor;
    this.texture = texture;
    this.calories = calories;
  }
}

const ingredients: Ingredient[] = [];

const input = await Deno.readTextFile("input.txt");
input.split("\r\n").forEach((el) => {
  const line = el.split(" ");
  ingredients.push(
    new Ingredient(
      line[0].replace(/:$/, ""),
      parseInt(line[2].replace(/,$/, "")),
      parseInt(line[4].replace(/,$/, "")),
      parseInt(line[6].replace(/,$/, "")),
      parseInt(line[8].replace(/,$/, "")),
      parseInt(line[10])
    )
  );
});

function score(teaspoons: number[]) {
  let capacity = 0,
    durability = 0,
    flavor = 0,
    texture = 0;
  for (let i = 0; i < ingredients.length; i++) {
    capacity += teaspoons[i] * ingredients[i].capacity;
    durability += teaspoons[i] * ingredients[i].durability;
    flavor += teaspoons[i] * ingredients[i].flavor;
    texture += teaspoons[i] * ingredients[i].texture;
  }

  if (capacity < 0) {
    capacity = 0;
  }
  if (durability < 0) {
    durability = 0;
  }
  if (flavor < 0) {
    flavor = 0;
  }
  if (texture < 0) {
    texture = 0;
  }

  return capacity * durability * flavor * texture;
}

let winner = 0;

// for (let i = 0; i < 100; i++) {
//   winner = Math.max(winner, score([i, 100 - i]));
// }

for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100 - i; j++) {
    for (let k = 0; k < 100 - i - j; k++) {
      const l = 100 - i - j - k;
      winner = Math.max(winner, score([i, j, k, l]));
    }
  }
}

console.log(winner);
