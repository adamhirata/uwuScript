#!/usr/bin/env node

const { argv } = require("yargs")
  .usage("$0 [-a] [-o] [-i] filename")
  .boolean(["a", "o", "i"])
  .describe("a", "show abstract syntax tree after parsing then stop")
  .describe("o", "do optimizations")
  .describe("i", "generate and show the intermediate code then stop")
  .demand(1);

const fs = require("fs");
const util = require("util");
const parse = require("./ast/parser");
require("./semantics/analyzer");
require("./semantics/optimizer");
require(`./backend/javascript-generator`);

fs.readFile(argv._[0], "utf-8", (error, text) => {
  if (error) {
    console.error(error);
    return;
  }
  let program = parse(text);
  if (argv.a) {
    console.log(util.inspect(program, { depth: null }));
    return;
  }
  program.analyze();
  if (argv.o) {
    program = program.optimize();
  }
  if (argv.i) {
    console.log(util.inspect(program, { depth: null }));
    return;
  }
  program.gen();
});
