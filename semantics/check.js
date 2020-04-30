const {
  NullType,
  NumType,
  StringType,
  BooleanType,
  ArrayType,
  DictionaryType,
  //Func,
  //FunctionObject,
} = require("../Ast");
//const util = require("util");

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// function isAssignableTo(exp, type) {
//   if (
//     exp.type.constructor === DictionaryType &&
//     type.constructor === DictionaryType
//   ) {
//     exp.members.forEach((m) => {
//       isAssignableTo(m.exp1, type.type1);
//       isAssignableTo(m.exp2, type.type2);
//     });
//   } else if (
//     exp.type.constructor === ArrayType &&
//     type.constructor === ArrayType
//   ) {
//     exp.members.forEach((m) => {
//       isAssignableTo(m, type.type);
//     });
//   } else if (exp.type === NullType) {
//   } else {
//     doCheck(
//       exp.type === type,
//       `expression of type ${util.format(exp.type)}
//      is not compatible with ${util.format(type)} ಥ_ಥ`
//     );
//   }
// }

// function isAssignableTo(exp, type) {
//   console.log("oof");
//   console.log(type);
//   if (
//     exp.type.constructor === DictionaryType &&
//     type.constructor === DictionaryType
//   ) {
//     exp.members.forEach((m) => {
//       isAssignableTo(m.exp1, type.type1);
//       isAssignableTo(m.exp2, type.type2);
//     });
//   } else if (
//     exp.type.constructor === ArrayType &&
//     type.constructor === ArrayType
//   ) {
//     console.log("oofers");
//     exp.members.forEach((m) => {
//       isAssignableTo(m, type.type);
//     });
//   } else if (exp.type === NullType) {
//   } else {
//     doCheck(
//       exp.type === type,
//       `expression of type ${util.format(exp.type)}
//      is not compatible with ${util.format(type)} ಥ_ಥ`
//     );
//   }
//}

function isAssignableTo(exp, type) {
  // if (exp.type === NullType) {
  // } else {
  //   doCheck(
  //     JSON.stringify(exp.type) === JSON.stringify(type),
  //     "Types are not compatible"
  //   );
  // }
  doCheck(
    JSON.stringify(exp.type) === JSON.stringify(type),
    "Types are not compatible"
  );
}

function isNumber(exp) {
  doCheck(
    JSON.stringify(exp.type) === JSON.stringify(NumType),
    "Not a Numbwer ಥ_ಥ"
  );
}

function isBoolean(exp) {
  doCheck(
    JSON.stringify(exp.type) === JSON.stringify(BooleanType),
    "Not a Numbwer ಥ_ಥ"
  );
}

function isString(exp) {
  doCheck(
    JSON.stringify(exp.type) === JSON.stringify(StringType),
    "Not a Numbwer ಥ_ಥ"
  );
}

function isArray(exp) {
  doCheck(
    JSON.stringify(exp.type) === JSON.stringify(ArrayType),
    "Not an Awway/Aww ಥ_ಥ"
  );
}

function isDictionary(exp) {
  doCheck(
    JSON.stringify(exp.type) === JSON.stringify(DictionaryType),
    "Not a Dictionawy ಥ_ಥ"
  );
}

module.exports = {
  isNumber,

  isBoolean,

  isString,

  isArray,

  isDictionary,

  sameType(exp1, exp2) {
    doCheck(
      exp1.type === exp2.type,
      "expressions must have same type ＼（＾○＾）人（＾○＾）／"
    );
  },

  isAssignableTo,

  // isFunction(entity) {
  //   doCheck(entity.constructor instanceof FunctionObject, "Not a function ಥ_ಥ");
  // },

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
