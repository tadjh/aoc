// deno run --watch --allow-all a.ts

export {};
const input = await Deno.readTextFile("input.txt");
const [options, molecule] = input.split("\r\n\r\n").map((line, i) => {
  if (i === 0) {
    return line.split("\r\n").map((str) => {
      const a = str.match(/(\w+) => (\w+)/);
      a?.shift();
      return a;
    });
  }
  return line;
}) as [string[][], string];

function findSubstitution(
  search1: string,
  search2: string,
  options: string[][]
) {
  const substitutions: string[] = [];
  let search = "";
  for (let i = 0; i < options.length; i++) {
    if (options[i][0] === search1) {
      substitutions.push(options[i][1]);
      search = search1;
    } else if (options[i][0] === search1 + search2) {
      substitutions.push(options[i][1]);
      search = search1 + search2;
    }
  }
  return [search, substitutions];
}

function replacements(molecule: string, options: string[][]) {
  const molecules: string[] = [];
  for (let i = 0; i < molecule.length; i++) {
    const [search, substitutions] = findSubstitution(
      molecule[i],
      i + 1 !== molecule.length ? molecule[i + 1] : "",
      options
    );
    for (let j = 0; j < substitutions.length; j++) {
      const pre = molecule.slice(0, i);
      const post = molecule.slice(i + search.length);
      molecules.push(pre + substitutions[j] + post);
    }
  }
  return molecules;
}

console.log(new Set(replacements(molecule, options)).size);
