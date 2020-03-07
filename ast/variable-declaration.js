// const Variable = require("./variable");

module.exports = class VariableDeclaration {
  constructor(type, ids, initializers) {
    Object.assign(this, { type, ids, initializers });
  }
};
