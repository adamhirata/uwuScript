const {
  NumType,
  StringType,
  BooleanType,
  ArrayType,
  DictType
} = require("./builtins");

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

module.exports = {
  isNumber(exp) {
    doCheck(exp.type === NumType, "Not a Numbwer ಥ_ಥ");
  },

  isBoolean(exp) {
    doCheck(exp.type === BooleanType, "Not a Boowean/Boow ಥ_ಥ");
  },

  isString(exp) {
    doCheck(exp.type === StringType, "Not a Stwing ಥ_ಥ");
  },

  isArray(exp) {
    doCheck(exp.type === ArrayType, "Not an Awway/Aww ಥ_ಥ");
  },

  isDictionary(exp) {
    doCheck(exp.type === DictType, "Not a Dictionawy ಥ_ಥ");
  },

  sameType(exp1, exp2) {
    exp1.type === exp2.type,
      "expressions must have same type ＼（＾○＾）人（＾○＾）／";
  },

  isAssignableTo(exp, type) {
    doCheck(
      exp.type === type,
      `expression of type ${util.format(exp.type)}
       is not compatible with ${util.format(type)} ಥ_ಥ`
    );
  },

  isFunction(value) {
    doCheck(value instanceof Func, "Not a function");
  }
};
