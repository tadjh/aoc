// deno run --watch --allow-all a.ts

const input = await Deno.readTextFile("input.txt");
const data = input.split("\r\n\r\n").reduce((prev, curr) => {
  const [slug, data] = curr.split(":");
  return {
    ...prev,
    [slug.split(" ")[0]]: data
      .split("\r\n")
      .filter((val) => val)
      .map((item) =>
        item
          .trim()
          .split(" ")
          .map((num) => Number(num))
      ),
  };
}, {}) as Record<string, [number, number, number][]>;

function getValue(item: number, data: [number, number, number][]) {
  for (let i = 0; i < data.length; i++) {
    const [dest, src, range] = data[i];
    if (item >= src && item <= src + range) {
      return dest - src + item;
    }
  }

  return item;
}

console.log(
  data["seeds"][0]
    .map((seed) => getValue(seed, data["seed-to-soil"]))
    .map((soil) => getValue(soil, data["soil-to-fertilizer"]))
    .map((fertilizer) => getValue(fertilizer, data["fertilizer-to-water"]))
    .map((water) => getValue(water, data["water-to-light"]))
    .map((light) => getValue(light, data["light-to-temperature"]))
    .map((temp) => getValue(temp, data["temperature-to-humidity"]))
    .map((humidity) => getValue(humidity, data["humidity-to-location"]))
    .reduce((prev, curr) => {
      if (!prev || curr < prev) {
        return curr;
      }
      return prev;
    }, 0)
);
