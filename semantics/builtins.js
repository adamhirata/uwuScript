const { Func, Parameter, PrimitiveType } = require("../ast/index.js");
const NullType = new PrimitiveType("null");
const NumType = new PrimitiveType("Numbwer");
const StringType = new PrimitiveType("Stwing");
const BooleanType = new PrimitiveType("Boowean");

const StandardFunctions = [
  new Func("void", "pwint", [new Parameter(StringType, "s")]),
  new Func(NumType, "length", [new Parameter(StringType, "s")]),
];

StandardFunctions.forEach((f) => {
  f.builtin = true;
});

module.exports = {
  NullType,
  NumType,
  StringType,
  BooleanType,
  StandardFunctions,
};
