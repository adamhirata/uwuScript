const util = require("util");
const {
  NullType,
  NumType,
  StringType,
  BooleanType,
  ArrayType,
  DictionaryType,
  Func,
} = require("../ast");

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function isAssignableTo(exp, type) {
  if (
    exp.type.constructor === DictionaryType &&
    type.constructor === DictionaryType
  ) {
    exp.members.forEach((m) => {
      isAssignableTo(m.exp1, type.type1);
      isAssignableTo(m.exp2, type.type2);
    });
  } else if (
    exp.type.constructor === ArrayType &&
    type.constructor === ArrayType
  ) {
    exp.members.forEach((m) => {
      isAssignableTo(m, type.type);
    });
  } else if (exp.type === NullType) {
  } else {
    doCheck(
      exp.type === type,
      `expression of type ${util.format(exp.type)}
     is not compatible with ${util.format(type)} ಥ_ಥ`
    );
  }
}

module.exports = {
  isNumber(exp) {
    console.log(NumType);
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

  isFunction(value) {
    doCheck(value instanceof Func, "Not a function ಥ_ಥ");
  },

  isCollectionType(e) {
    return e.constructor === ArrayType || e.constructor === DictionaryType;
  },

  legalArugments(args, params) {
    doCheck(
      args.length === params.length,
      `expected ${params.length} arguments, recieved ${args.length} ಥ_ಥ`
    );
    args.forEach((arg, i) => this.isAssignableTo(arg, params[i].type));
  },
};
