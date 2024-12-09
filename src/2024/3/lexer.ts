export enum TokenType {
  Identifier = "Identifier",
  Number = "Number",
  Comma = "Comma",
  OpenParenthesis = "OpenParenthesis",
  CloseParenthesis = "CloseParenthesis",
  Unknown = "Unknown",
  EOF = "EOF",
}

export type Token = {
  type: TokenType;
  value: string;
};

export class Lexer {
  private input: string;
  private position: number = 0;
  private validIdentifiers = ["mul", "do", "don't"];

  constructor(input: string) {
    this.input = input.trim();
  }

  private peek(): string {
    return this.position < this.input.length ? this.input[this.position] : "";
  }

  private advance(): string {
    return this.input[this.position++] || "";
  }

  public nextToken(): Token {
    while (this.position < this.input.length) {
      const char = this.peek();

      // Skip whitespace
      if (/\s/.test(char)) {
        this.advance();
        continue;
      }

      if (/[a-zA-Z_]/.test(char)) {
        return this.readIdentifier();
      }

      if (/[0-9]/.test(char)) {
        return this.readNumber();
      }

      if (char === "(") {
        this.advance();
        return { type: TokenType.OpenParenthesis, value: "(" };
      }

      if (char === ")") {
        this.advance();
        return { type: TokenType.CloseParenthesis, value: ")" };
      }

      if (char === ",") {
        this.advance();
        return { type: TokenType.Comma, value: "," };
      }

      console.error(
        `Unexpected character: "${char}" at position ${this.position}`
      );
      this.advance();
      return { type: TokenType.Unknown, value: char };
    }

    return { type: TokenType.EOF, value: "" };
  }

  private readIdentifier(): Token {
    let identifier = "";

    while (/[a-zA-Z_']/.test(this.peek())) {
      identifier += this.advance();
    }

    if (this.validIdentifiers.includes(identifier)) {
      return { type: TokenType.Identifier, value: identifier };
    } else if (
      this.validIdentifiers.some(
        (id) =>
          !identifier.startsWith(id) &&
          identifier.includes(id) &&
          identifier.endsWith(id)
      )
    ) {
      identifier = this.validIdentifiers.find(
        (id) =>
          !identifier.startsWith(id) &&
          identifier.includes(id) &&
          identifier.endsWith(id)
      )!;
      return { type: TokenType.Identifier, value: identifier };
    } else {
      console.error(`Invalid identifier detected: "${identifier}"`);
      return this.nextToken();
    }
  }

  private readNumber(): Token {
    let number = "";
    while (/[0-9]/.test(this.peek())) {
      number += this.advance();
    }
    return { type: TokenType.Number, value: number };
  }
}

