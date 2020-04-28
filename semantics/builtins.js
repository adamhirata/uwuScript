const { Func, Parameter, NumType, StringType } = require("../ast");

const StandardFunctions = [
  new Func("void", "pwint", [new Parameter(StringType, "s")]),
  new Func(NumType, "length", [new Parameter(StringType, "s")]),
];

StandardFunctions.forEach((f) => {
  f.builtin = true;
});

module.exports = { StandardFunctions };
