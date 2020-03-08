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

class FunctionDeclaration {
  constructor(type, id, params, body) {
    this.id = id;
    this.function = new FunctionObject(type, id, params, body);
  }
}

class FunctionObject {
  constructor(type, id, params, body) {
    Object.assign(this, { type, id, params, body });
  }
}

class IdentifierExpression {
  constructor(id) {
    this.id = id;
  }
}

class IfStatement {
  constructor(cases, alternate) {
    Object.assign(this, { cases, alternate });
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
  constructor(type, ids, initializers) {
    Object.assign(this, { type, ids, initializers });
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
  FunctionDeclaration,
  IfStatement,
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
  TinyBlock,
  UnaryExpression,
  VariableDeclaration,
  Variable,
  WhileStatement
};
