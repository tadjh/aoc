// deno run --watch --allow-all a.ts

export {};

class Item {
  private _name: string;
  private _cost: number;
  private _damage: number;
  private _armor: number;

  constructor(name: string, cost: number, damage: number, armor: number) {
    this._name = name;
    this._cost = cost;
    this._damage = damage;
    this._armor = armor;
  }

  public get name(): string {
    return this._name;
  }

  public get cost(): number {
    return this._cost;
  }

  public get damage(): number {
    return this._damage;
  }

  public get armor(): number {
    return this._armor;
  }
}

class Player {
  private _name: string;
  private _hitpoints: number;
  private _damage: number;
  private _armor: number;
  private _cost: number;
  private _items: Item[];

  constructor(name: string, hitpoints: number, damage: number, armor: number) {
    this._name = name;
    this._hitpoints = hitpoints;
    this._damage = damage;
    this._armor = armor;
    this._cost = 0;
    this._items = [];
  }

  public get name() {
    return this._name;
  }

  public get hitpoints() {
    return this._hitpoints;
  }

  public set hitpoints(damage: number) {
    this._hitpoints -= Math.max(damage - this._armor, 1);
  }

  public get damage() {
    return this._damage;
  }

  public get armor() {
    return this._armor;
  }

  public get cost() {
    return this._cost;
  }

  public get items() {
    const items: string[] = [];
    for (const item of this._items) {
      items.push(item.name);
    }
    return items.join(", ");
  }

  public attack(defender: Player): [Player, number] {
    defender.hitpoints = this._damage;
    // console.log(
    //   "The %s deals %d damage; the %s goes down to %d hit points",
    //   this._name,
    //   Math.max(this._damage - defender.armor, 1),
    //   defender.name,
    //   defender.hitpoints
    // );
    return [this, defender.hitpoints];
  }

  public addItem(item: Item) {
    this._cost += item.cost;
    this._damage += item.damage;
    this._armor += item.armor;
    this._items.push(item);
  }
}

const input = await Deno.readTextFile("input.txt");
const [weapons, armors, rings] = await Deno.readTextFile("items.txt").then(
  (text) =>
    text.split("\r\n\r\n").map((type, i) =>
      type
        .split("\r\n")
        .filter((_, i) => i !== 0)
        .map((row) => {
          const a = row.match(/[+-]?\w+/g)!;
          if (i === 2)
            return new Item(
              a[0] + " " + a[1],
              parseInt(a[2]),
              parseInt(a[3]),
              parseInt(a[4])
            );
          return new Item(a[0], parseInt(a[1]), parseInt(a[2]), parseInt(a[3]));
        })
        .reduce((a, b) => (a = [...a, b]), [] as Item[])
    )
);

const lines = input.split("\r\n") as string[];
const bossStats = lines.map((line) => {
  return parseInt(line.match(/(\d+)/) + "" ?? 0);
}) as [number, number, number];

function turn(player: Player, boss: Player, isPlayersTurn: boolean) {
  if (isPlayersTurn) return player.attack(boss);
  return boss.attack(player);
}

function fight(player: Player, boss: Player, isPlayersTurn = false) {
  while (true) {
    isPlayersTurn = !isPlayersTurn;
    const [attacker, hitpoints] = turn(player, boss, isPlayersTurn);
    if (hitpoints < 1) {
      if (attacker.name !== player.name) {
        console.log(
          "%s is the winner!!! player spent %d",
          attacker.name.toLocaleUpperCase(),
          player.cost,
          player.items
        );
        return player.cost;
      }
      return;
    }
  }
}

let max = 0;

// one weapon
for (const weapon of weapons) {
  //no armor
  {
    // zero rings
    {
      const player = new Player("player", 100, 0, 0);
      const boss = new Player("boss", ...bossStats);
      player.addItem(weapon);
      const cost = fight(player, boss);
      if (cost) max = max === 0 ? cost : Math.max(cost, max);
    }

    // one ring
    for (let i = 0; i < rings.length; i++) {
      const player = new Player("player", 100, 0, 0);
      const boss = new Player("boss", ...bossStats);
      player.addItem(weapon);
      player.addItem(rings[i]);
      const cost = fight(player, boss);
      if (cost) max = max === 0 ? cost : Math.max(cost, max);
    }

    // two rings
    for (let i = 0; i < rings.length; i++) {
      for (let j = 0; j < rings.length; j++) {
        if (i === j) continue;
        const player = new Player("player", 100, 0, 0);
        const boss = new Player("boss", ...bossStats);
        player.addItem(weapon);
        player.addItem(rings[i]);
        player.addItem(rings[j]);
        const cost = fight(player, boss);
        if (cost) max = max === 0 ? cost : Math.max(cost, max);
      }
    }
  }

  for (const armor of armors) {
    // zero rings
    {
      const player = new Player("player", 100, 0, 0);
      const boss = new Player("boss", ...bossStats);
      player.addItem(weapon);
      player.addItem(armor);
      const cost = fight(player, boss);
      if (cost) max = max === 0 ? cost : Math.max(cost, max);
    }
    // one ring
    for (let i = 0; i < rings.length; i++) {
      const player = new Player("player", 100, 0, 0);
      const boss = new Player("boss", ...bossStats);
      player.addItem(weapon);
      player.addItem(armor);
      player.addItem(rings[i]);
      const cost = fight(player, boss);
      if (cost) max = max === 0 ? cost : Math.max(cost, max);
    }
    // two rings
    for (let i = 0; i < rings.length; i++) {
      for (let j = 0; j < rings.length; j++) {
        if (i === j) continue;
        const player = new Player("player", 100, 0, 0);
        const boss = new Player("boss", ...bossStats);
        player.addItem(weapon);
        player.addItem(armor);
        player.addItem(rings[i]);
        player.addItem(rings[j]);
        const cost = fight(player, boss);
        if (cost) max = max === 0 ? cost : Math.max(cost, max);
      }
    }
  }
}

console.log(max);
