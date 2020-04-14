const {
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
  WhileStatement
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
  this.tester = this.tester.map(e => e.optimize());
  return this;
};
