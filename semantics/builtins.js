const { Func, Parameter, NumType, StringType } = require("../ast");

const StandardFunctions = [
  new Func("void", "pwint", [new Parameter("void", "s")]),
  new Func(NumType, "length", new Parameter("void", "s")),
];

StandardFunctions.forEach((f) => {
  f.builtin = true;
});

module.exports = { StandardFunctions };
