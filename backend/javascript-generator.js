/*
 * Translation to JavaScript
 *
 * Requiring this module adds a gen() method to each of the AST classes, except
 * for types, and fields, which don’t figure into code generation. It exports a
 * function that generates a complete, pretty-printed JavaScript program for a
 * uwuScript expression, bundling the translation of the uwuScript standard library with
 * the expression's translation.
 *
 * Each gen() method returns a fragment of JavaScript.
 *
 *   const generate = require('./backend/javascript-generator');
 *   generate(uwuScriptExpression);
 */

//const beautify = require("js-beautify");
const prettyJs = require("pretty-js");

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

function makeOp(op) {
  return { "==": "===", "!=": "!==" }[op] || op;
}

function makeKeyword(op) {
  return { twue: String.raw`true`, fawse: String.raw`false` }[op] || op;
}

const javaScriptId = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    if (!map.has(v)) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v}_${map.get(v)}`;
  };
})();

const builtin = {
  pwint([s]) {
    return `console.log(${s})`;
  },
  length([s]) {
    return `${s}.length`;
  },
  substwing([s, i, n]) {
    return `${s}.substring(${i}, ${n})`;
  },
  concat([s, t]) {
    return `${s}.concat(${t})`;
  },
  exit(code) {
    return `process.exit(${code})`;
  },
};

function generateBlock(block) {
  return block.map((s) => `${s.gen()};`).join("");
}
module.exports = function(exp) {
  //console.log("EXP STATEMENT", exp.statements);
  return prettyJs(generateBlock(exp.statements), { indent: "  " });
};

Argument.prototype.gen = function() {
  return this.expression.gen();
};

Argument.prototype.gen = function() {
  return this.expression.gen();
};

ArrayExpression.prototype.gen = function() {
  return `Array(${this.size.gen()}).fill(${this.fill.gen()})`;
};

AssignmentStatement.prototype.gen = function() {
  return `${this.target.gen()} = ${this.source.gen()}`;
};

BinaryExpression.prototype.gen = function() {
  return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
};

BooleanLiteral.prototype.gen = function() {
  return `${makeKeyword(this.value)}`;
};

BreakStatement.prototype.gen = function() {
  return "break";
};

Call.prototype.gen = function() {
  const args = this.args.map((a) => a.gen());
  //console.log("[CALL CALLEE]", this.callee);
  if (this.callee.value.builtin) {
    console.log("true");
    return builtin[this.callee.id](args);
  }
  return `${this.callee.gen()}(${args.join(",")})`;
};

DictionaryExpression.prototype.gen = function() {
  const formattedKeyValues = [];
  const keyValues = this.exp.map((kv) => kv.gen());
  for (let i = 0; i < this.exp.length; i += 1) {
    formattedKeyValues.push(keyValues[i]);
  }
  return `{ ${formattedKeyValues.join(", ")} }`;
};

ForStatement.prototype.gen = function() {
  const tester = javaScriptId(this.tester);
  console.log("TEST 1", this.test1);
  const test1 = this.test1.gen();
  const test2 = this.test2.gen();
  console.log("[TEST1]: ", test1, "\n[TEST2]: ", test2);
  console.log("BLOCK", this.block);
  const block = this.block.statements;
  return `for (let ${tester} = ${test1}; ${tester} <= ${test1}; ${tester} += ${test2}) {${block.join(
    ";\n"
  )};}`;
};

Func.prototype.gen = function() {
  const name = javaScriptId(this);
  const params = this.parameters
    ? this.parameters.map((p) => javaScriptId(p))
    : [""];
  return `function ${name} (${params.join(",")}) {${this.body.gen()}}`;
};

IfStatement.prototype.gen = function() {
  const cases = this.cases.map((test, index) => {
    const prefix = index === 0 ? "if" : "} else if";
    return `${prefix} (${test.gen()}) {${generateBlock(
      this.consequents[index].simpleStmt
    )}`;
  });
  const alternate = this.alternate
    ? `}else{${generateBlock(this.alternate.simpleStmt)}`
    : "";
  return `${cases.join("")}${alternate}}`;
};

NumericLiteral.prototype.gen = function() {
  return `${this.value}`;
};

StringLiteral.prototype.gen = function() {
  //console.log("STRING LIT GEN", this.value);
  return `${this.value}`;
};

UnaryExpression.prototype.gen = function() {
  return `(${makeOp(this.op)} ${this.operand.gen()})`;
};

Variable.prototype.gen = function() {
  return `${javaScriptId(this.id)}`;
};

VariableDeclaration.prototype.gen = function() {
  return `let ${javaScriptId(this.id)} = ${this.initializer.gen()}`;
};

WhileStatement.prototype.gen = function() {
  return `while (${this.test.gen()}) { ${generateBlock(
    this.body.simpleStmt
  )} }`;
};
