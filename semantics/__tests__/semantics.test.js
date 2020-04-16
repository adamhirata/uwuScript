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
  Stwing a () uwu 
        Numbwer a = 1               (ﾉﾟ▽ﾟ)ﾉ           this is a comment
        Numbwer b = 1 + 1           (づ ◕‿◕ )づ     All binary operators + assignment
        Numbwer c = 1 - 1
        Numbwer d = 1 * 1
        Numbwer e = 1 / 1
        Numbwer f = 1 % 1
        Boowean g = 1 < 1
        Boowean h = 1 > 1
        Boow    i = 1 == 1
        Boow    j = 1 >= 1
        Boow    k = 1 <= 1
        Boow    l = 1 != 1
        Boow    m = twue

        Numbwer n = -1              (*≧ω≦*)           Unary operators
        Boow    o = !fawse

        Dictionawy< Stwing to Boow >    p = { "a" to fawse, "b" to twue }       (ﾉﾟ▽ﾟ)ﾉ       Dictionary and Array types
        Awway< Awway<Stwing> >          q = [["hi"], ["dr"], ["Toal"], [":)"]]

        Stwing  r = null            (づ ◕‿◕ )づ         The million-dollar mistake
        retuwn "Stwing"
    owo
    Stwing b () uwu retuwn "hi" owo     (*≧ω≦*)     Single-line function declaration

    wile (1) uwu pwint("hi") owo        (ﾉﾟ▽ﾟ)ﾉ     While-statements
    wile (1) uwu
        pwint("hi")
        pwint("Prof Toal")
    owo
    wile (1) uwu owo

    if (1 < 1) uwu                      (づ ◕‿◕ )づ     If, else-if, else
        retuwn
    owo ewse if (1 > 1) uwu
    owo ewse uwu pwint("hi") owo

    fow i in 0...Len(Awway) uwu         (*≧ω≦*)         For-statements
        fow j in 0...Len(Awway) uwu
            pwint(Awway[i][j])
        owo
    owo

    pwint("hi")
    
    (╯°益°)╯彡┻━┻
        this
        is
        a
        multi
        line
        comment
    ┬─┬ノ( º _ ºノ)
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
