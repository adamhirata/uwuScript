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
  WhileStatement,
} = require("../ast");
const check = require("./check");
const Context = require("./context");

module.exports = function(exp) {
  exp.analyze(Context.INITIAL);
};

BinaryExpression.prototype.analyze = function(context) {
  this.left.analyze(context);
  this.right.analyze(context);

  if (/[-+*/%]/.test(this.op)) {
    check.isNumber(this.left);
    check.isNumber(this.right);
    this.type = NumType;
  } else if (["<", "<=", ">", ">="].includes(this.op)) {
    check.isNumber(this.left);
    check.isNumber(this.right);
    this.type = BooleanType;
  } else if (/\|\||&&/.test(this.op)) {
    check.isBoolean(this.left);
    check.isBoolean(this.right);
    this.type = BooleanType;
  } else if (["!=", "=="].includes(this.op)) {
    check.sameType(this.left.type, this.right.type);
    this.type = BooleanType;
  }
};

BooleanLiteral.prototype.analyze = function(context) {
  this.type = BooleanType;
};

BreakStatement.prototype.analyze = function(context) {
  if (!context.inLoop) throw Error("Break statement used out of loop ლ(ﾟдﾟლ)");
};

ForStatement.prototype.analyze = function(context) {
  this.test1.analyze(context);
  this.test2.analyze(context);
  const blockContext = context.createChildContextForLoop();
  this.body.forEach((n) => n.analyze(bodyContext));
};

IfStatement.prototype.analyze = function(context) {
  this.cases.forEach((cases) => {
    cases.analyze(context);
    check.isBoolean(cases);
  });
  this.consequents.forEach((block) => {
    const blockContext = context.createChildContextForBlock();
    block.forEach((statement) => statement.analyze(blockContext));
  });
  if (this.alternate) {
    const alternateBlock = context.createChildContextForBlock();
    this.alternate.forEach((s) => s.analyze(alternateBlock));
  }
};

NumericLiteral.prototype.analyze = function(context) {
  this.type = NumType;
};

StringLiteral.prototype.analyze = function(context) {
  this.type = StringType;
};

Parameter.prototype.analyze = function(context) {
  context.add(this);
};

ReturnStatement.prototype.analyze = function(context) {
  this.returnValue.analyze(context);
};

Program.prototype.analyze = function(context) {
  this.statements.forEach((sm) => sm.analyze(context));
};
