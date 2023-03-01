// deno run --watch --allow-all a.ts

export {};

let result = -1;
let house = 0;

function printHouse(house: number, presents: number) {
  console.log("House %d got %d presents", house, presents);
}

function getPresents(house: number) {
  let count = 0;
  for (let i = 1; i <= house; i++) {
    if (house % i === 0) {
      count += i * 10;
    }
  }
  return count;
}

while (result < 0) {
  ++house;

  const presents = getPresents(house);

  printHouse(house, presents);

  if (presents >= 29000000) {
    result = 0;
  }
}

console.log(result);
