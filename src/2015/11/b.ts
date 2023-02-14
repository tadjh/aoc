// deno run --watch --allow-all b.ts

export {};
let input = "cqjxxzaa".split("");

const letters = "abcdefghijklmnopqrstuvwxyz";

let lastInput = input.join("");

function nextLetter(letter: string) {
  return letter === "z"
    ? (letter = "a")
    : (letter = String.fromCharCode(letter.charCodeAt(0) + 1));
}

function validatePassword(password: string[], logging = false) {
  let doubles = 0;
  let lastDouble = -1;
  let run = "";
  let bannedLetter = "";
  lastInput = password.join("");

  for (let i = 0; i < password.length; i++) {
    if (bannedLetter !== "") {
      password[i] = "a";
      continue;
    }

    if (password[i] === "i" || password[i] === "l" || password[i] === "o") {
      bannedLetter = password[i];
      password[i] = String.fromCharCode(password[i].charCodeAt(0) + 1);
      continue;
    }

    if (
      run === "" &&
      i < password.length - 2 &&
      letters.includes(password[i] + password[i + 1] + password[i + 2])
    ) {
      run = password[i] + password[i + 1] + password[i + 2];
    }

    // if (i === password.length - 3 && run === "") {
    //   password[i + 1] = nextLetter(password[i]);
    //   password[i + 2] = nextLetter(password[i + 1]);
    //   run = password[i] + password[i + 1] + password[i + 2];
    // }

    if (doubles < 2 && i !== lastDouble && password[i] === password[i + 1]) {
      doubles++;
      lastDouble = i + 1;
    }

    // if (i === password.length - 1 && doubles < 2) {
    //   password[i] = nextLetter(password[i]);
    //   continue;
    // }
  }

  input = password;

  if (bannedLetter !== "") {
    if (logging)
      console.log("Contains invalid letter", bannedLetter, password.join(""));
    return false;
  }

  if (run === "") {
    if (logging)
      console.log(
        "Does not contain an alphabetical run of letters",
        password.join("")
      );
    return false;
  }

  if (doubles < 2) {
    if (logging)
      console.log("Does not contain enough doubles", password.join(""));
    return false;
  }

  return true;
}

function nextPassword(password: string[]) {
  for (let i = password.length - 1; i > 0; i--) {
    if (password[i] === "z") {
      password[i] = nextLetter(password[i]);
      continue;
    }

    password[i] = nextLetter(password[i]);
    break;
  }

  return password;
}

while (!validatePassword(input)) {
  input = nextPassword(input);
  if (lastInput === input.join("")) break;
}

console.log("Done:", input.join(""));
