const { Func, Parameter, NumType, StringType } = require("../ast");

const StandardFuctions = [
  new Func("void", "pwint", [new Param("void", "s")]),
  new Func(NumType, "lenght", new Param("void", "s"))
];

module.exports = {
  StandardFuctions
};
