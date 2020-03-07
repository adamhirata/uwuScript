// Parser module
//
//   const parse = require('./parser');
//   const ast = parse(sourceCodeString);

const ohm = require("ohm-js");
const fs = require("fs");

const {
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
