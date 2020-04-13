const { Func, Parameter, PrimitiveType } = require('../ast');

const NumType = new PrimitiveType("Numbwer");
const StringType = new PrimitiveType("Stwing");
const BooleanType = new PrimitiveType("Boowean");



module.exports = {
  NumType,
  StringType,
  BooleanType,
};
