// deno run --watch --allow-all a.ts

export {};

type attr =
  | "children"
  | "cats"
  | "samoyeds"
  | "pomeranians"
  | "akitas"
  | "vizslas"
  | "goldfish"
  | "trees"
  | "cars"
  | "perfumes";

class Aunt {
  id: number;
  children: number | undefined;
  cats: number | undefined;
  samoyeds: number | undefined;
  pomeranians: number | undefined;
  akitas: number | undefined;
  vizslas: number | undefined;
  goldfish: number | undefined;
  trees: number | undefined;
  cars: number | undefined;
  perfumes: number | undefined;

  constructor(attributes: { [key: string]: number | undefined }) {
    this.id = attributes.id || -1;
    this.children = attributes.children;
    this.cats = attributes.cats;
    this.samoyeds = attributes.samoyeds;
    this.pomeranians = attributes.pomeranians;
    this.akitas = attributes.akitas;
    this.vizslas = attributes.vizslas;
    this.goldfish = attributes.goldfish;
    this.trees = attributes.trees;
    this.cars = attributes.cars;
    this.perfumes = attributes.perfumes;
  }
}

const input = await Deno.readTextFile("test.txt");
const aunts = input.split("\r\n").map((line) => {
  const parsed = line.match(
    /Sue (\d+): (\w+): (\d+), (\w+): (\d+), (\w+): (\d+)/
  );

  return new Aunt({
    id: parseInt(parsed![1]),
    [parsed![2]]: parseInt(parsed![3]),
    [parsed![4]]: parseInt(parsed![5]),
    [parsed![6]]: parseInt(parsed![7]),
  });
}) as Aunt[];

const myAunt = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

function findAunt() {
  let auntId = -1;
  for (const aunt of aunts) {
    if (aunt.children !== undefined && aunt.children !== myAunt.children)
      continue;
    if (aunt.cats !== undefined && aunt.cats !== myAunt.cats) continue;
    if (aunt.samoyeds !== undefined && aunt.samoyeds !== myAunt.samoyeds)
      continue;
    if (
      aunt.pomeranians !== undefined &&
      aunt.pomeranians !== myAunt.pomeranians
    )
      continue;
    if (aunt.akitas !== undefined && aunt.akitas !== myAunt.akitas) continue;
    if (aunt.vizslas !== undefined && aunt.vizslas !== myAunt.vizslas) continue;
    if (aunt.goldfish !== undefined && aunt.goldfish !== myAunt.goldfish)
      continue;
    if (aunt.trees !== undefined && aunt.trees !== myAunt.trees) continue;
    if (aunt.cars !== undefined && aunt.cars !== myAunt.cars) continue;
    if (aunt.perfumes !== undefined && aunt.perfumes !== myAunt.perfumes)
      continue;
    auntId = aunt.id;
  }
  return auntId;
}

console.log(findAunt());
