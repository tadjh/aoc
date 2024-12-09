import { ASTNode } from "./parser.ts";

export class Interpreter {
  private functions: { [key: string]: (...args: number[]) => number } = {
    mul: (a, b) => a * b,
    // add: (a, b) => a + b,
    // sub: (a, b) => a - b,
  };

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

    throw new Error(`Unknown node type: ${node.type}`);
  }

  public evaluateAll(asts: ASTNode[]): number {
    return asts.reduce((total, ast, index) => {
      try {
        const result = this.evaluate(ast);
        if (Number.isNaN(result)) {
          console.log("isNaN", ast);
        }

        console.log(`Result of AST ${index + 1}:`, result);
        return total + result;
      } catch (error) {
        console.error(
          `Error evaluating AST ${index + 1}:`,
          (error as Error).message
        );
        return total; // Skip errors, add nothing to the total
      }
    }, 0);
  }
}

