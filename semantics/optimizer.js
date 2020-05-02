const {
  Argument,
  ArrayExpression,
  ArrayType,
  AssignmentStatement,
  BinaryExpression,
  BooleanLiteral,
  BreakStatement,
  Call,
  DictionaryExpression,
  DictionaryType,
  ForStatement,
  Func,
  IfStatement,
  KeyValPair,
  LargeBlock,
  NumericLiteral,
  Parameter,
  Program,
  ReturnStatement,
  StringLiteral,
  SubscriptedExpression,
  TernaryStatement,
  TinyBlock,
  UnaryExpression,
  VariableDeclaration,
  Variable,
  WhileStatement,
} = require("../ast");

function isZero(e) {
  return e instanceof NumericLiteral && e.value === 0;
}

function isOne(e) {
  return e instanceof NumericLiteral && e.value === 1;
}

function bothNumericLiterals(e) {
  return e.left instanceof NumericLiteral && e.right instanceof NumericLiteral;
}

function bothBooleanLiterals(e) {
  return e.left instanceof BooleanLiteral && e.right instanceof BooleanLiteral;
}

BinaryExpression.prototype.optimize = function() {
  this.left = this.left.optimize();
  this.right = this.right.optimize();

  if (this.op === "+" && isZero(this.right)) return this.left;
  if (this.op === "+" && isZero(this.left)) return this.right;
  if (this.op === "-" && isZero(this.right)) return this.left;
  if (this.op === "*" && (isZero(this.right) || isZero(this.left)))
    return new NumericLiteral(leftType, "0");
  if (this.op === "*" && isOne(this.right)) return this.left;
  if (this.op === "*" && isOne(this.left)) return this.right;

  if (this.op === "!=")
    return new BooleanLiteral(this.left.value !== this.right.value);
  if (this.op === "==")
    return new BooleanLiteral(this.left.value === this.right.value);

  if (bothBooleanLiterals(this)) {
    const [lval, rval] = [this.left.value, this.right.value];
    if (this.op === "&&") return new BooleanLiteral(lval && rval);
    if (this.op === "||") return new StringLiteral(lval || rval);
  }

  if (bothNumericLiterals(this)) {
    const [lval, rval] = [this.left.value, this.right.value];
    if (this.op === "+") return new NumericLiteral(lval + rval);
    if (this.op === "-") return new NumericLiteral(lval - rval);
    if (this.op === "*") return new NumericLiteral(lval * rval);
    if (this.op === "/") return new NumericLiteral(lval / rval);
    if (this.op === "%") return new NumericLiteral(lval % rval);

    if (this.op === "<=") return new BooleanLiteral(lval <= rval);
    if (this.op === "<") return new BooleanLiteral(lval < rval);
    if (this.op === ">=") return new BooleanLiteral(lval >= rval);
    if (this.op === ">") return new BooleanLiteral(lval > rval);
  }

  return this;
};

BreakStatement.prototype.optimize = function() {
  return this;
};

ForStatement.prototype.optimize = function() {
  this.test1 = this.test1.optimize;
  this.test2 = this.test2.optimize;
  this.block = this.block.optimize;
  this.tester = this.tester.map((e) => e.optimize());
  return this;
};

Program.prototype.optimize = function() {
  for (let i = 0; i < this.statements.length; i += 1) {
    this.statements[i] = this.statements[i].optimize();
  }
  this.statements.filter((s) => s !== null);
  return this;
};

ReturnStatement.prototype.optimize = function() {
  this.returnValue = this.returnValue.optimize();
  return this;
};

SubscriptedExpression.prototype.optimize = function() {
  this.subscript = this.subscript.optimize();
  return this;
};

TernaryStatement.prototype.optimize = function() {
  this.test = this.test.optimize();
  this.success = this.success.optimize();
  this.fail = this.fail.optimize();
  return this;
};

TinyBlock.prototype.optimize = function() {
  this.simpleStmt = this.simpleStmt.optimize;
};

UnaryExpression.prototype.optimize = function() {
  this.operand = this.operand.optimize();
  if (this.op === "!" && this.operand instanceof BooleanLiteral) {
    return new BooleanLiteral(!this.operand.value);
  }
  if (this.op === "-" && this.operand instanceof NumericLiteral) {
    return new NumericLiteral(-this.operand.value);
  }
  return this;
};

VariableDeclaration.prototype.optimize = function() {
  this.exp = this.exp.optimize();
  return this;
};

Variable.prototype.ReturnStatement.optimize = function() {
  return this;
};

WhileStatement.prototype.optimize = function() {
  this.test = this.test.optimize();
  this.body.forEach((i) => {
    this.body[i] = this.body[i].optimize();
  });
  return this;
};
