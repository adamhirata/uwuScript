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

  Numbwer add(Numbwer num1, Numbwer num2) uwu
    retuwn num1 + num2
  owo

  add(5, 3)

  Numbwer num3 = add(5, 2)

  void sayHi() uwu
    pwint("hi")
  owo

  sayHi()

  if (1 < 2) uwu 1 owo
  ewse if (1 > 2) uwu 2 owo
  ewse uwu 3 owo

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
