class Argument {
  constructor(id, expression) {
    Object.assign(this, { id, expression });
  }
}

class AssignmentStatement {
  constructor(targets, sources) {
    Object.assign(this, { targets, sources });
  }
}

class BinaryExpression {
  constructor(op, left, right) {
    Object.assign(this, { op, left, right });
  }
}

class BooleanLiteral {
  constructor(value) {
    this.value = value;
  }
}

class BreakStatement {}

class Call {
  constructor(callee, args) {
    Object.assign(this, { callee, args });
  }
}

class DictionaryExpression {
  constructor(members) {
    this.members = members;
  }
}

class DictionaryType {
  constructor(type1, type2) {
    Object.assign(this, { type1, type2 });
  }
}

class ForStatement {
  constructor(tester, test1, test2, block) {
    Object.assign(this, { tester, test1, test2, block });
  }
}

class Func {
  constructor(type, id, params, body) {
    this.id = id;
    this.function = new FunctionObject(type, id, params, body);
  }
}

class FunctionObject {
  constructor(type, id, params, body) {
    Object.assign(this, { type, id, params, body });
  }

  analyze(context) {
    this.params - this.params.map((p) => new Parameter(p.type, p.id));
    this.params.forEach((p) => p.analyze(context));
    this.body.forEach((sm) => sm.analyze(context));

    //Go through the function to look for return statements
    const rs = this.body.filter((b) => b.constructor === ReturnStatement);
    if (rs.length === 0 && this.type !== "void") {
      throw new Error("No retuwn statement found ヾ( ￣O￣)ツ");
    } else if (returnStatement.length > 0) {
      if (this.type === "void") {
        throw new Error(
          "Void functions cannot have retuwn statements (」°ロ°)」"
        );
      }
      this.isAssignableTo(returnStatement[0].returnValue.type, this.type);
    }
  }
}

class IfStatement {
  constructor(cases, consequents, alternate) {
    Object.assign(this, { cases, consequents, alternate });
  }
}

class KeyValPair {
  constructor(exp1, exp2) {
    this.exp1 = exp1;
    this.exp2 = exp2;
  }
}

class LargeBlock {
  constructor(statements) {
    this.statements = statements;
  }
}

class ArrayExpression {
  constructor(members) {
    this.members = members;
  }
}

class ArrayType {
  constructor(type) {
    this.type = type;
  }
}

class NumericLiteral {
  constructor(value) {
    this.value = value;
  }
}

class Parameter {
  constructor(type, id, defaultExpression) {
    Object.assign(this, { type, id, defaultExpression });
  }
}

class PrimitiveType {
  constructor(type) {
    this.type = type;
  }
}

class Program {
  constructor(statements) {
    this.statements = statements;
  }
}

class ReturnStatement {
  constructor(returnValue) {
    this.returnValue = returnValue;
  }
}

class StringLiteral {
  constructor(value) {
    this.value = value;
  }
}

class SubscriptedExpression {
  constructor(variable, subscript) {
    Object.assign(this, { variable, subscript });
  }
}

class TernaryStatement {
  constructor(test, success, fail) {
    Object.assign(this, { test, success, fail });
  }
}

class TinyBlock {
  constructor(simpleStmt) {
    this.simpleStmt = simpleStmt;
  }
}

class UnaryExpression {
  constructor(op, operand) {
    Object.assign(this, { op, operand });
  }
}
class VariableDeclaration {
  constructor(type, id, initializer) {
    Object.assign(this, { type, id, initializer });
  }
}

class Variable {
  constructor(id) {
    this.id = id;
  }
}

class WhileStatement {
  constructor(test, body) {
    Object.assign(this, { test, body });
  }
}

const NumType = new PrimitiveType("Numbwer");
const StringType = new PrimitiveType("Stwing");
const BooleanType = new PrimitiveType("Boowean");

module.exports = {
  Argument,
  ArrayExpression,
  ArrayType,
  AssignmentStatement,
  BinaryExpression,
  BooleanLiteral,
  BooleanType,
  BreakStatement,
  Call,
  DictionaryExpression,
  DictionaryType,
  ForStatement,
  Func,
  IfStatement,
  KeyValPair,
  LargeBlock,
  ArrayExpression,
  NumericLiteral,
  NumType,
  Parameter,
  Program,
  ReturnStatement,
  StringLiteral,
  StringType,
  SubscriptedExpression,
  TernaryStatement,
  TinyBlock,
  UnaryExpression,
  VariableDeclaration,
  Variable,
  WhileStatement,
};
