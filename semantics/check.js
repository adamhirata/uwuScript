const util = require("util");
const {
  NullType,
  NumType,
  StringType,
  BooleanType,
  ArrayType,
  DictionaryType,
  Func,
  FunctionObject,
} = require("../ast");

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isAssignableTo(exp, type) {
  console.log(
    "[EXP]: ",
    JSON.stringify(exp.type),
    "[TYPE]",
    JSON.stringify(type),
    "Are they equal?",
    JSON.stringify(exp.type) === JSON.stringify(type)
  );
  doCheck(
    JSON.stringify(exp.type) === JSON.stringify(type),
    `Types are not compatible`
  );
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
    doCheck(exp.type === DictionaryType, "Not a Dictionawy ಥ_ಥ");
  },

  sameType(exp1, exp2) {
    doCheck(
      exp1.type === exp2.type,
      "expressions must have same type ＼（＾○＾）人（＾○＾）／"
    );
  },

  isAssignableTo,

  isFunction(entity) {
    doCheck(entity.constructor instanceof FunctionObject, "Not a function ಥ_ಥ");
  },

  isCollectionType(e) {
    return e.constructor === ArrayType || e.constructor === DictionaryType;
  },

  legalArugments(args, params) {
    doCheck(
      args.length === params.length,
      `expected ${params.length} arguments, recieved ${args.length} ಥ_ಥ`
    );
    isAssignableTo(args, params);
  },
};
