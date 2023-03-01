// deno run --watch --allow-all b.ts

export {};

const target = 29000000 - 1;
const max = 50 - 1;

let result = -1;
let house = 0;
const elves: { [key: number]: number } = {};

function printHouse(house: number, presents: number) {
  console.log("House %d got %d presents", house, presents);
}

function getPresents(house: number) {
  let count = 0;
  for (let i = 1; i <= house; i++) {
    if (elves[i] === undefined) {
      elves[i] = 0;
    }

    if (elves[i] > max) continue;

    if (house % i === 0) {
      elves[i] += 1;
      count += i * 11;
    }
  }
  return count;
}

while (result < 0) {
  ++house;

  const presents = getPresents(house);

  printHouse(house, presents);

  if (presents > target) {
    result = house;
  }
}

console.log(result);
