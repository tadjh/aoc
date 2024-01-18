// deno run --watch --allow-all b.ts

type Data = Record<string, [number, number, number][]> & {
  seeds: [number, number][];
};

const input = await Deno.readTextFile("input.txt");
const data = input.split("\r\n\r\n").reduce((prev, curr) => {
  const [slug, data] = curr.split(":");
  if (slug === "seeds") {
    return {
      ...prev,
      [slug]: data
        .trim()
        .split(" ")
        .map((num) => Number(num))
        .reduce(
          (prev, curr, idx, arr) => {
            if (!(idx & 1)) {
              return [...prev, [curr, arr[idx + 1]]] as [number, number][];
            }
            return prev;
          },
          [] as [number, number][]
        )
        .sort((a, b) => a[0] - b[0]),
    };
  }
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
      )
      .sort((a, b) => a[0] - b[0]),
  };
}, {}) as Data;

function isSeed(item: number) {
  for (let i = 0; i < data["seeds"].length; i++) {
    const [src, range] = data["seeds"][i];
    if (item >= src && item <= src + range - 1) {
      return true;
    }
  }

  return false;
}

function getReverse(item: number, data: [number, number, number][]) {
  for (let i = 0; i < data.length; i++) {
    const [dest, src, range] = data[i];
    if (item >= dest && item <= dest + range) {
      return src - dest + item;
    }
  }
  return item;
}

const max =
  data["humidity-to-location"][data["humidity-to-location"].length - 1][0] +
  data["humidity-to-location"][data["humidity-to-location"].length - 1][2];

function getLocation() {
  for (let i = 0; i < max; i++) {
    const seed = getReverse(
      getReverse(
        getReverse(
          getReverse(
            getReverse(
              getReverse(
                getReverse(i, data["humidity-to-location"]),
                data["temperature-to-humidity"]
              ),
              data["light-to-temperature"]
            ),
            data["water-to-light"]
          ),
          data["fertilizer-to-water"]
        ),
        data["soil-to-fertilizer"]
      ),
      data["seed-to-soil"]
    );

    if (isSeed(seed)) {
      return i;
    }
  }
}

console.log(getLocation());
