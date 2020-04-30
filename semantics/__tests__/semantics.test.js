/*
 * Semantics Success Test
 *
 * These tests check that the semantic analyzer correctly accepts a program that passes
 * all of semantic constraints specified by the language.
 */

const parse = require("../../ast/parser");
const analyze = require("../analyzer");

// This is just enough to complete 100% analyzer coverage, but feels light to me.
const program = String.raw`
  Numbwer a = 1 + 1 - (-1)
  Stwing b = "Welcome to our test pwogwam"
  Boowean c = twue
  Boow d = fawse || twue
  Boow e = 1 == 1 && 1 < 2 && !fawse

  pwint(b)
  
  a = 2
  Awway< Awway<Stwing> > f = [["hi"], ["dr"], ["Toal"], [":)"]]
  Dict<Stwing to Stwing> g = {"hi" to "there", "what's" to "up"}
  
`;

describe("The semantic analyzer", () => {
  test("accepts the mega program with all syntactic forms", (done) => {
    const astRoot = parse(program);
    expect(astRoot).toBeTruthy();
    analyze(astRoot);
    expect(astRoot).toBeTruthy();
    done();
  });
});
