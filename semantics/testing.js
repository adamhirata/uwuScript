const analyze = require("./analyzer");
const parse = require("../ast/parser");

const program = String.raw`
  Numbwer a = 1
  Stwing b = "Welcome to our test pwogwam"
  Boowean c = twue
  Boow d = fawse
  pwint(b)
  
  a = twue
`;

const astRoot = parse(program);
analyze(astRoot);
