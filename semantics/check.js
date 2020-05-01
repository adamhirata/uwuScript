const {
  NullType,
  NumType,
  StringType,
  BooleanType,
  ArrayType,
  DictionaryType,
} = require("../semantics/builtins");

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isArray(exp) {
  doCheck(
    JSON.stringify(exp.type) === JSON.stringify(ArrayType),
    "Not an Awway/Aww ಥ_ಥ"
  );
}

function isAssignableTo(exp, type) {
  console.log("EXP", exp.type, "TYPE", type);
  doCheck(
    JSON.stringify(exp.type) === JSON.stringify(type),
    `Types are not compatible`
  );
}

function isBoolean(exp) {
  doCheck(
    JSON.stringify(exp.type) === JSON.stringify(BooleanType),
    "Not a Numbwer ಥ_ಥ"
  );
}

function isCollectionType(e) {
  return e.constructor === ArrayType || e.constructor === DictionaryType;
}

function isDictionary(exp) {
  doCheck(
    JSON.stringify(exp.type) === JSON.stringify(DictionaryType),
    "Not a Dictionawy ಥ_ಥ"
  );
}

function isFunction(entity) {
  doCheck(entity.constructor instanceof FunctionObject, "Not a function ಥ_ಥ");
}

function isNumber(exp) {
  //console.log("[EXP TYPE]: ", exp.type, "[NUM TYPE]: ", NumType);
  doCheck(
    JSON.stringify(exp.type) === JSON.stringify(NumType),
    "Not a Numbwer ಥ_ಥ"
  );
}

function isString(exp) {
  doCheck(
    JSON.stringify(exp.type) === JSON.stringify(StringType),
    "Not a Numbwer ಥ_ಥ"
  );
}

function legalArugments(args, params) {
  doCheck(
    args.length === params.length,
    `expected ${params.length} arguments, recieved ${args.length} ಥ_ಥ`
  );
  isAssignableTo(args, params);
}

function sameType(exp1, exp2) {
  doCheck(
    exp1.type === exp2.type,
    "expressions must have same type ＼（＾○＾）人（＾○＾）／"
  );
}

module.exports = {
  doCheck,
  isArray,
  isAssignableTo,
  isBoolean,
  isCollectionType,
  isDictionary,
  isFunction,
  isNumber,
  isString,
  legalArugments,
  sameType,
};
