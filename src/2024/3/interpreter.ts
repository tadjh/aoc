import { ASTNode } from "./parser.ts";

export class Interpreter {
  private nodes: ASTNode[];
  private position: number = 0;
  private functions: { [key: string]: (...args: number[]) => number } = {
    mul: (a, b) => a * b,
  };

  constructor(asts: ASTNode[]) {
    this.nodes = asts;
  }

  private advance() {
    return this.nodes[this.position++];
  }

  public evaluate(node: ASTNode): number {
    if (node.type === "NumberLiteral") {
      return parseInt(node.value!);
    }

    if (node.type === "FunctionCall") {
      const func = this.functions[node.value!];

      if (!func) {
        throw new Error(`Unknown function: ${node.value}`);
      }

      const args = node.arguments!.map((arg) => this.evaluate(arg));
      return func(...args);
    }

    throw new Error(`Unknown node type: ${JSON.stringify(node, null, 2)}`);
  }

  public evaluateAll(): number {
    let total = 0;

    while (this.position < this.nodes.length) {
      const node = this.advance();
      const result = this.evaluate(node);

      if (Number.isNaN(result)) {
        console.log(`isNaN at ${node.id}`);
        continue;
      }

      // console.log(`Result of AST at ${this.position}:`, result);
      total += result;
    }

    return total;
  }
}
