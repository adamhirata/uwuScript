const { StandardFunctions } = require("./builtins");

class Context {
  constructor({ parent = null, currentFunction = null, inLoop = false } = {}) {
    Object.assign(this, {
      parent,
      currentFunction,
      inLoop,
      declarations: new Map(),
    });
  }

  createChildContextForFunctionBody(currentFunction) {
    // When entering a new function, we're not in a loop anymore
    return new Context({ parent: this, currentFunction, inLoop: false });
  }

  createChildContextForLoop() {
    // When entering a loop body, just set the inLoop field, retain others
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: true,
    });
  }

  createChildContextForBlock() {
    // For a block, we have to retain both the function and loop settings.
    return new Context({
      parent: this,
      currentFunction: this.currentFunction,
      inLoop: this.inLoop,
    });
  }

  add(entity) {
    if (entity.id in this.declarations) {
      throw new Error(
        `Identifier ${entity.id} is already declared in this scope ヾ(ﾟдﾟ)ﾉ`
      );
    }
    this.declarations[entity.id] = entity;
  }

  lookupValue(id) {
    for (let context = this; context !== null; context = context.parent) {
      if (id in context.declarations) {
        return context.declarations[id];
      }
    }
    throw new Error(`${id} has not been declared ヽ(๏∀๏ )ﾉ`);
  }

  assertInFunction(message) {
    if (!this.currentFunction) {
      throw new Error(message);
    }
  }
}

Context.INITIAL = new Context();
StandardFunctions.forEach((f) => {
  Context.INITIAL.declarations[f.id] = f;
});

module.exports = Context;
