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
  constructor(id, params, body) {
    Object.assign(this, { id, params, body });
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

class ListExpression {
  constructor(members) {
    this.members = members;
  }
}

class NumericLiteral {
  constructor(value) {
    this.value = value;
  }
}

class Parameter {
  constructor(id, defaultExpression) {
    Object.assign(this, { id, defaultExpression });
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

class UnaryExpression {
  constructor(op, operand) {
    Object.assign(this, { op, operand });
  }
}
class VariableDeclaration {
  constructor(ids, initializers) {
    Object.assign(this, { ids, initializers });
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

module.exports = {
  Argument,
  AssignmentStatement,
  BinaryExpression,
  BooleanLiteral,
  BreakStatement,
  Call,
  FunctionDeclaration,
  FunctionObject,
  IdentifierExpression,
  IfStatement,
  ListExpression,
  NumericLiteral,
  Parameter,
  Program,
  ReturnStatement,
  StringLiteral,
  SubscriptedExpression,
  UnaryExpression,
  VariableDeclaration,
  Variable,
  WhileStatement
};
