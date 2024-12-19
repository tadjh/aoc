import { Token, TokenType } from "./lexer.ts";

export interface ASTNode {
  type: string;
  value?: string;
  arguments?: ASTNode[];
}

export class Parser {
  private tokens: Token[];
  private position: number = 0;
  private enabled: boolean = true;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(): Token {
    return this.tokens[this.position] || { type: TokenType.EOF, value: "" };
  }

  private advance(): Token {
    return this.tokens[this.position++] || { type: TokenType.EOF, value: "" };
  }

  public parseAll(): ASTNode[] {
    const nodes: ASTNode[] = [];

    while (this.peek().type !== TokenType.EOF) {
      try {
        nodes.push(this.parseExpression());
      } catch (error) {
        console.error("Skipping invalid syntax:", (error as Error).message);
        this.recover();
      }
    }

    return nodes;
  }

  private parseExpression(): ASTNode {
    const token = this.advance();

    if (token.type === TokenType.Identifier) {
      const node = this.parseFunctionCall(token);

      if (node.value === "do") {
        this.enabled = true;
        return this.parseExpression();
      }

      if (node.value === "don't") {
        this.enabled = false;
        return this.parseExpression();
      }

      if (this.enabled === false) {
        throw new Error(
          `Unexpected expression: ${token.value}, Enabled is ${this.enabled}`
        );
      }

      if (node.arguments && node.arguments?.length < 2) {
        throw new Error(
          `Invalid arguments: ${node.value} does not has enough arguments`
        );
      }

      return node;
    }

    throw new Error(`Unexpected token: ${token.value}`);
  }

  private parseFunctionCall(identifierToken: Token): ASTNode {
    const node: ASTNode = {
      type: "FunctionCall",
      value: identifierToken.value,
      arguments: [],
    };

    const nextToken = this.advance();
    if (nextToken.type !== TokenType.OpenParenthesis) {
      throw new Error(`Expected '(', found: ${nextToken.value}`);
    }

    while (this.peek().type !== TokenType.CloseParenthesis) {
      // Skip comma
      if (this.peek().type === TokenType.Comma) {
        this.advance();
        continue;
      }

      node.arguments!.push(this.parseArgument());
    }

    const closingParenthesis = this.advance();

    if (closingParenthesis.type !== TokenType.CloseParenthesis) {
      throw new Error(`Expected ')', found: ${closingParenthesis.value}`);
    }

    return node;
  }

  private parseArgument(): ASTNode {
    const token = this.advance();

    if (token.type === TokenType.Number) {
      return { type: "NumberLiteral", value: token.value };
    }

    if (token.type === TokenType.Identifier) {
      return this.parseFunctionCall(token);
    }

    throw new Error(`Unexpected token: ${token.value}`);
  }

  private recover(): void {
    while (
      this.peek().type !== TokenType.EOF &&
      this.peek().type !== TokenType.Identifier
    ) {
      this.advance();
    }
  }
}

