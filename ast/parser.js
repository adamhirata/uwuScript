// Parser module
//
//   const parse = require('./parser');
//   const ast = parse(sourceCodeString);

const ohm = require("ohm-js");
const fs = require("fs");

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
  //DictionaryExpression,
  FunctionDeclaration,
  IfStatement,
  LargeBlock,
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
} = require(".");

const grammar = ohm.grammar(fs.readFileSync("./syntax/uwuScript.ohm"));

function arrayToNullable(a) {
  return a.length === 0 ? null : a[0];
}

/* eslint-disable no-unused-vars */
const astBuilder = grammar.createSemantics().addOperation("ast", {
  Program(_1, b, _2) {
    return new Program(b.ast());
  },
  Statement_simple(statement, _n) {
    return statement.ast();
  },
  Statement_while(_w, _p1, test, _p2, block) {
    return new WhileStatement(test.ast(), block.ast());
  },
  Statement_if(
    _i,
    _p1,
    firstTest,
    _p2,
    firstBlock,
    _ei,
    _p3,
    moreTests,
    moreBlocks,
    _p4,
    _e,
    lastBlock
  ) {
    const tests = [firstTest.ast(), ...moreTests.ast()];
    const consquents = [firstBlock.ast(), ...moreBlocks.ast()];
    const alternate = arrayToNullable(lastBlock.ast());
    return new IfStatement(tests, consequents, alternate);
  },
  Statement_for(_f, _id, _in, test1, _1, test2, block) {
    return new ForStatement(test1.ast(), test2.ast(), block.ast());
  },
  Statement_ternary(test1, _q, test2, _e, test3) {
    return new TernaryStatement(test1.ast(), test2.ast(), test3.ast());
  },
  Statement_funcdec(type, id, _p1, params, _p2, block) {
    return new FunctionDeclaration(
      type.ast(),
      id.ast(),
      params.ast(),
      block.ast()
    );
  },
  SimpleStmt_vardec(type, id, _e, exp) {
    return new VariableDeclaration(type.ast(), id.ast(), exp.ast());
  },
  SimpleStmt_assignment(varexp, _e, exps) {
    return new AssignmentStatement(varexp.ast(), exps.ast());
  },
  SimpleStmt_break(_b) {
    return new BreakStatement();
  },
  SimpleStmt_return(_r, val) {
    return new ReturnStatement(val.ast());
  },
  Block_tiny(_u, ss, _o, nl) {
    return new TinyBlock(ss.ast());
  },
  Block_large(_u, nl, stmts, _o, nl1) {
    return new LargeBlock(stmts.ast());
  },
  Exp_or(e, _o, e1) {
    return new BinaryExpression("||", e.ast(), e1.ast());
  },
  Exp_and(e, _o, e1) {
    return new BinaryExpression("&&", e.ast(), e1.ast());
  },
  Exp1_binary(e1, op, e2) {
    return new BinaryExpression(op.sourceString, e1.ast(), e2.ast());
  },
  Exp2_binary(e2, op, e3) {
    return new BinaryExpression(op.sourceString, e2.ast(), e3.ast());
  },
  Exp3_binary(e3, op, e4) {
    return new BinaryExpression(op.sourceString, e3.ast(), e4.ast());
  },
  Exp4_unary(op, e4) {
    return new UnaryExpression(op.sourceString, e4.ast());
  },
  Exp5_array(_b, list, _b2) {
    return new ArrayExpression(list.ast());
  },
  // Exp5_dictionary(_b, list, _b2) {
  //   return new DictionaryExpression(list.ast());
  // },
  Exp5_parens(_p, e, _p1) {
    return e.ast();
  },
  Call(varexp, _p, args, _p1) {
    return new Call(varexp.ast(), args.ast());
  },
  Param(type, id, _e, def) {
    return new Parameter(type.ast(), id.ast(), arrayToNullable(def.ast()));
  },
  Arg(id, _c, exp) {
    return new Argument(id.ast(), exp.ast());
  },
  VarExp_subscripted(v, _b1, e, _b2) {
    return new SubscriptedExpression(v.ast(), e.ast());
  },
  VarExp_simple(id) {
    return new Variable(id.ast());
  },
  NonemptyListOf(first, _, rest) {
    return [first.ast(), ...rest.ast()];
  },
  EmptyListOf() {
    return [];
  },
  NumType(_) {
    return NumType;
  },
  StringType(_) {
    return StringType;
  },
  BooleanType(_) {
    return BooleanType;
  },
  ArrayType(_1, type, _2) {
    return new ArrayType(type.ast());
  },
  id(_1, _2) {
    return this.sourceString;
  },
  numlit(_d, _p, _d1, _d2) {
    return new NumericLiteral(+this.sourceString);
  },
  boollit(_val) {
    return new BooleanLiteral(this.sourceString);
  },
  strlit(_q, _chars, _q1) {
    return new StringLiteral(this.sourceString);
  }
});
/* eslint-enable no-unused-vars */

module.exports = text => {
  const match = grammar.match(text);
  if (!match.succeeded()) {
    throw match.message;
  }
  return astBuilder(match).ast();
};
