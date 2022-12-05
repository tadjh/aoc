// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("test.txt");
const arr = input.split("\r\n") as string[];

const hasEnoughDoubleChar = (str: string) => {
  const hash: { [key: string]: number } = {};
  for (let i = 0; i < str.length; i++) {
    if (i === str.length - 1) break;
    const pair = str[i] + str[i + 1];

    if (str[i - 1] === str[i + 1] && str[i] === str[i + 1]) {
      continue;
    }

    hash[pair] ? (hash[pair] += 1) : (hash[pair] = 1);

    if (hash[pair] === 2) return true;
  }

  return false;
};

const hasReflectedChar = (str: string) => {
  for (let i = 0; i < str.length; i++) {
    // if (i === 0 || i === str.length - 1) {
    //   continue;
    // }

    if (str[i - 1] === str[i + 1]) {
      console.log(str[i - 1] + str[i] + str[i + 1]);
      return true;
    }
  }
  return false;
};

let output = 0;

for (let i = 0; i < arr.length; i++) {
  console.log(hasEnoughDoubleChar(arr[i]));

  // if (hasEnoughDoubleChar(arr[i]) && hasReflectedChar(arr[i])) {
  //   output++;
  // }
}

console.log(output);
