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
  FunctionObject,
  IfStatement,
  KeyValPair,
  LargeBlock,
  Null,
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
const {
  NullType,
  NumType,
  StringType,
  BooleanType,
} = require("../semantics/builtins");
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
  check.isAssignableTo(this.sources, this.targets.type);
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

BooleanLiteral.prototype.analyze = function() {
  this.type = BooleanType;
};

BreakStatement.prototype.analyze = function(context) {
  if (!context.inLoop) throw Error("Break statement used out of loop ლ(ﾟдﾟლ)");
};

Call.prototype.analyze = function(context) {
  this.callee.analyze(context);
  this.args.forEach((a) => a.analyze(context));

  const funcType = this.callee.value.function
    ? this.callee.value.function
    : this.callee.value;
  this.type = funcType.type;

  console.log("[CALL THIS.TYPE]: ", this.type);

  context.isFunction(this.callee.value);
  this.args.forEach((a, i) => {
    const paramType = funcType.params[i].type;
    console.log("[CALLPARAMTYPE]: ", paramType);
    console.log("[CALL ARGS]: ", a);
    if (paramType !== "void") {
      check.legalArugments(funcType.params[i], a.expression.type);
    }
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
  const blockContext = context.createChildContextForLoop();
  this.block.statements.forEach((n) => n.analyze(blockContext));
};

Func.prototype.analyze = function(context) {
  context.add(this.function);
  this.function.analyze(context.createChildContextForFunctionBody(this));
};

FunctionObject.prototype.analyze = function(context) {
  this.params.forEach((p) => p.analyze(context));

  if (this.body instanceof LargeBlock) {
    this.body.statements.forEach((sm) => sm.analyze(context));

    const rs = this.body.statements.filter(
      (b) => b.constructor === ReturnStatement
    );

    if (rs.length === 0 && this.type !== "void") {
      throw new Error("No retuwn statement found ヾ( ￣O￣)ツ");
    } else if (rs.length > 0 && this.type === "void") {
      throw new Error(
        "Void functions cannot have retuwn statements (」°ロ°)」"
      );
    } else {
      rs.forEach((sm) => check.isAssignableTo(sm.returnValue[0], this.type));
    }
  } else {
    this.body.simpleStmt.analyze(context);
    if (
      this.body.simpleStmt.constructor === ReturnStatement &&
      this.type === "void"
    ) {
      throw new Error(
        "Void functions cannot have retuwn statements (」°ロ°)」"
      );
    } else if (
      this.body.simpleStmt.constructor !== ReturnStatement &&
      this.type !== "void"
    ) {
      throw new Error("No retuwn statement found ヾ( ￣O￣)ツ");
    }
    check.isAssignableTo(this.body.simpleStmt.returnValue, this.type);
  }
};

IfStatement.prototype.analyze = function(context) {
  this.cases.forEach((test) => {
    test.analyze(context);
    check.isBoolean(test);
  });
  this.consequents.forEach((block) => {
    const blockContext = context.createChildContextForBlock();
    block.simpleStmt.forEach((statement) => {
      statement.analyze(blockContext);
    });
  });
  if (this.alternate) {
    const alternateBlock = context.createChildContextForBlock();
    this.alternate.simpleStmt.forEach((s) => s.analyze(alternateBlock));
  }
};

KeyValPair.prototype.analyze = function(context) {
  this.exp1.analyze(context);
  this.exp2.analyze(context);
};

LargeBlock.prototype.analyze = function(context) {
  this.statements.forEach((sm) => sm.analyze(context));
};

Null.prototype.analyze = function() {
  this.type = NullType;
};

NumericLiteral.prototype.analyze = function() {
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

StringLiteral.prototype.analyze = function() {
  this.type = StringType;
};

SubscriptedExpression.prototype.analyze = function(context) {
  console.log("[THIS.VAR]: ", this.variable);
  this.subscript.analyze(context);
  if (this.variable.type === ArrayType) {
    check.isNumber(this.subscript);
    this.type = this.variable.type.type;
  } else if (this.variable.type === DictionaryType) {
    check.sameType(this.id.type.type1, this.subscript.type);
    this.type = this.id.type.type2;
  }
  this.variable.analyze(context);
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
  this.body.simpleStmt.forEach((n) => n.analyze(bodyContext));
};

NumericLiteral.prototype.analyze = function() {
  this.type = NumType;
};

StringLiteral.prototype.analyze = function() {
  this.type = StringType;
};

Parameter.prototype.analyze = function(context) {
  context.add(this);
};

Program.prototype.analyze = function(context) {
  this.statements.forEach((sm) => sm.analyze(context));
};
