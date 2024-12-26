export enum TokenType {
  Identifier = "Identifier",
  Number = "Number",
  Comma = "Comma",
  OpenParenthesis = "OpenParenthesis",
  CloseParenthesis = "CloseParenthesis",
  Unknown = "Unknown",
  EOF = "EOF",
}

export interface Token {
  id: number;
  type: TokenType;
  value: string;
}

export class Lexer {
  private input: string;
  private position: number = 0;
  private identifiers: string[] = ["mul", "do", "don't"];

  constructor(input: string) {
    this.input = input.trim();
  }

  private peek(): string {
    return this.position < this.input.length ? this.input[this.position] : "";
  }

  private advance(): string {
    return this.position < this.input.length ? this.input[this.position++] : "";
  }

  public parseAll(): Token[] {
    const tokens: Token[] = [];
    let token: Token;

    do {
      token = this.nextToken();
      tokens.push(token);
    } while (token.type !== TokenType.EOF);

    return tokens;
  }

  public nextToken(): Token {
    while (this.position < this.input.length) {
      const char = this.peek();

      if (/\s/.test(char)) {
        // Skip whitespace
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
        return {
          id: this.position,
          type: TokenType.OpenParenthesis,
          value: "(",
        };
      }

      if (char === ")") {
        this.advance();
        return {
          id: this.position,
          type: TokenType.CloseParenthesis,
          value: ")",
        };
      }

      if (char === ",") {
        this.advance();
        return { id: this.position, type: TokenType.Comma, value: "," };
      }

      // console.error(
      //   `Unexpected character: "${char}" at position ${this.position}`
      // );
      this.advance();
      return { id: this.position, type: TokenType.Unknown, value: char };
    }

    return { id: this.position, type: TokenType.EOF, value: "" };
  }

  private readIdentifier(): Token {
    let value = "";

    while (/[a-zA-Z_']/.test(this.peek())) {
      value += this.advance();
    }

    if (this.identifiers.includes(value)) {
      return { id: this.position, type: TokenType.Identifier, value };
    }

    if (
      this.identifiers.some(
        (id) =>
          !value.startsWith(id) && value.includes(id) && value.endsWith(id)
      )
    ) {
      value = this.identifiers.find(
        (id) =>
          !value.startsWith(id) && value.includes(id) && value.endsWith(id)
      )!;
      return { id: this.position, type: TokenType.Identifier, value };
    }

    return { id: this.position, type: TokenType.Unknown, value };

    // console.error(`Invalid identifier detected: "${value}"`);
    // return this.nextToken();
  }

  private readNumber() {
    let value = "";
    while (/[0-9]/.test(this.peek())) {
      value += this.advance();
    }
    return { id: this.position, type: TokenType.Number, value };
  }
}
