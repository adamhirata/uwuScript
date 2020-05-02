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

const beautify = require("js-beautify");

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

// function makeOp(op) {
//   return { "=": "===", "<>": "!==", "&": "&&", "|": "||" }[op] || op;
// }

const javaScriptId = (() => {
  let lastId = 0;
  const map = new Map();
  return (v) => {
    if (!map.has(v)) {
      map.set(v, ++lastId); // eslint-disable-line no-plusplus
    }
    return `${v.id}_${map.get(v)}`;
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
    return `${s}.substr(${i}, ${n})`;
  },
  concat([s, t]) {
    return `${s}.concat(${t})`;
  },
  exit(code) {
    return `process.exit(${code})`;
  },
};

function generateBlock(block) {
  // console.log("[BLOCK]: ", block);
  return block.map((s) => `${s.gen()};`).join("");
}
module.exports = function(exp) {
  //console.log("EXP STATEMENT", exp.statements);
  return beautify(generateBlock(exp.statements), { indent_size: 2 });
};

Argument.prototype.gen = function() {
  return this.expression.gen();
};

ArrayExpression.prototype.gen = function() {
  const members = this.members.map((m) => m.gen());
  return `[${members}]`;
};

AssignmentStatement.prototype.gen = function() {
  return `${this.target.gen()} = ${this.source.gen()}`;
};

BinaryExpression.prototype.gen = function() {
  return `(${this.left.gen()} ${makeOp(this.op)} ${this.right.gen()})`;
};

BooleanLiteral.prototype.gen = function() {
  return `${this.value}`;
};

BreakStatement.prototype.gen = function() {
  return "break";
};

Call.prototype.gen = function() {
  const args = this.args.map((a) => a.gen());
  if (this.callee.value.builtin) {
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
  const test1 = this.test1.gen();
  const test2 = this.test2.gen();
  const block = this.block.statements.map((s) => s.gen());
  return `for (let ${tester} = ${test1}; ${tester} <= ${test2}; ${tester} += 1) {${block.join(
    ";\n"
  )};}`;
};

Func.prototype.gen = function() {
  const name = javaScriptId(this.id);
  const params = this.function.params
    ? this.function.params.map((p) => javaScriptId(p.id))
    : [""];

  return `function ${name} (${params.join(
    ","
  )}) {${this.function.body.statements.map((s) => s.gen())}}`;
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

ReturnStatement.prototype.gen = function() {
  return `return ${this.returnValue[0].gen()};`;
};

StringLiteral.prototype.gen = function() {
  //console.log("STRING LIT GEN", this.value);
  return `${this.value}`;
};

TernaryStatement.prototype.gen = function() {
  const test = this.test.gen();
  const success = this.success.gen();
  const fail = this.fail.gen();
  return `${test} ? ${success} : ${fail}`;
};

UnaryExpression.prototype.gen = function() {
  return `(${makeOp(this.op)} ${this.operand.gen()})`;
};

Variable.prototype.gen = function() {
  return `let ${javaScriptId(this)} = ${this.init.gen()}`;
};

WhileStatement.prototype.gen = function() {
  return `while (${this.test.gen()}) { ${this.body.gen()} }`;
};
