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
  FunctionObject,
  IfStatement,
  KeyValPair,
  LargeBlock,
  Null,
  NullType,
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

Argument.prototype.analyze = function(context) {
  this.expression.analyze(context);
};

ArrayExpression.prototype.analyze = function(context) {
  this.members.forEach((m) => {
    m.analyze(context);
  });
  if (this.members.length > 0) {
    this.type = new ArrayType(this.members[0].type);
    this.members.forEach((m) => {
      check.sameType(this.type.type, m.type);
    });
  }
};

AssignmentStatement.prototype.analyze = function(context) {
  this.sources.analyze(context);
  this.targets.analyze(context);
  check.isAssignableTo(this.source, this.target.type);
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

Call.prototype.analyze = function(context) {
  this.callee.analyze(context);
  this.args.forEach((a) => a.analyze(context));
  this.type = this.callee.type;
  console.log(
    "[CALLEE OBJECT]: ",
    this.callee,
    "[VALUE]: ",
    this.callee.value,
    "[PARAMS]: ",
    this.callee.value.function.params[0]
  );
  console.log("[ARGS]: ", this.args[0].expression);

  context.isFunction(this.callee.value);
  this.args.forEach((a, i) => {
    check.legalArugments(
      this.callee.value.function.params[i],
      a.expression.type
    );
  });
};

DictionaryExpression.prototype.analyze = function(context) {
  this.members.forEach((m) => {
    m.exp1.analyze(context);
    m.exp2.analyze(context);
  });
  if (this.members.length > 0) {
    this.type = new DictionaryType(
      this.members[0].exp1.type,
      this.members[0].exp2.type
    );
    this.members.forEach((m) => {
      check.isAssignableTo(m.exp1, this.type.type1);
      check.isAssignableTo(m.exp2, this.type.type2);
    });
  }
};

ForStatement.prototype.analyze = function(context) {
  this.test1.analyze(context);
  this.test2.analyze(context);
  const bodyContext = context.createChildContextForLoop();
  this.body.forEach((n) => n.analyze(bodyContext));
};

Func.prototype.analyze = function(context) {
  context.add(this.function);
  this.function.analyze(context.createChildContextForFunctionBody(this));
};

IfStatement.prototype.analyze = function(context) {
  this.tests.forEach((test) => {
    test.analyze(context);
    check.isBoolean(test);
  });
  this.consequents.map((block) => {
    const blockContext = context.createChildContextForBlock();
    block.map((statement) => {
      statement.analyze(blockContext);
    });
  });
  if (this.alternate) {
    const alternateBlock = context.createChildContextForBlock();
    this.alternate.map((s) => s.analyze(alternateBlock));
  }
};

KeyValPair.prototype.analyze = function(context) {
  this.exp1.analyze(context);
  this.exp2.analyze(context);
};

LargeBlock.prototype.analyze = function(context) {
  this.statements.forEach((sm) => sm.analyze(context));
};

Null.prototype.analyze = function(context) {
  this.type = NullType;
};

NumericLiteral.prototype.analyze = function(context) {
  this.type = NumType;
};

Program.prototype.analyze = function(context) {
  this.statements.forEach((sm) => sm.analyze(context));
};

ReturnStatement.prototype.analyze = function(context) {
  if (this.returnValue) {
    this.returnValue.forEach((v) => {
      v.analyze(context);
    });
  }
};

StringLiteral.prototype.analyze = function(context) {
  this.type = StringType;
};

SubscriptedExpression.prototype.analyze = function(context) {
  this.variable.analyze(context);
  this.subscript.analyze(context);
  if (variable.type === ArrayType) {
    check.isNumber(this.subscript);
    this.type = this.variable.type.type;
  } else if (variable.type === DictionaryType) {
    check.sameType(this.id.type.type1, this.subscript.type);
    this.type = this.id.type.type2;
  }
};

TernaryStatement.prototype.analyze = function(context) {
  this.test.analyze(context);
  check.isBoolean(this.test);
  this.success.analyze(context);
  this.fail.analyze(context);
  check.sameType(this.success.type, this.fail.type);
  this.type = this.success.type;
};

TinyBlock.prototype.analyze = function(context) {
  this.simpleStmt.analyze(context);
};

UnaryExpression.prototype.analyze = function(context) {
  this.operand.analyze(context);
  if (this.op == "-") {
    check.isNumber(this.operand);
    this.type = NumType;
  } else if (this.op == "!") {
    check.isBoolean(this.operand);
    this.type = BooleanType;
  }
};

VariableDeclaration.prototype.analyze = function(context) {
  this.initializer.analyze(context);
  check.isAssignableTo(this.initializer, this.type);
  context.add(this);
};

Variable.prototype.analyze = function(context) {
  this.value = context.lookupValue(this.id);
  this.type = this.value.type;
};

WhileStatement.prototype.analyze = function(context) {
  this.test.analyze(context);
  const bodyContext = context.createChildContextForLoop();
  this.body.forEach((n) => n.analyze(bodyContext));
};

IfStatement.prototype.analyze = function(context) {
  this.tests.forEach((test) => {
    test.analyze(context);
    check.isBoolean(test);
  });
  this.consequents.map((block) => {
    const blockContext = context.createChildContextForBlock();
    block.map((statement) => {
      statement.analyze(blockContext);
    });
  });
  if (this.alternate) {
    const alternateBlock = context.createChildContextForBlock();
    this.alternate.map((s) => s.analyze(alternateBlock));
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

Program.prototype.analyze = function(context) {
  this.statements.forEach((sm) => sm.analyze(context));
};
