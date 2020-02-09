/*
 * Grammar Success Test
 *
 * These tests check that our grammar accepts a program that features all of
 * syntactic forms of the language.
 */

const syntaxCheck = require('../syntax-checker');

const program = String.raw`
    Stwing a () uwu 
        Numbwer a = 1               (*≧ω≦*) this is a comment
        Numbwer b = 1 + 1
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
        retuwn "Stwing"
    owo

    Stwing b () uwu retuwn "Stwing" owo

    void c () uwu
        Stwing b = "Stwing"         (*≧ω≦*) notice the optional owo at the end of blocks

    (╯°益°)╯彡┻━┻
        this
        is
        a
        multi
        line
        comment
    ┬─┬ノ( º _ ºノ)
`;

describe('The syntax checker', () => {
  test('accepts the mega program with all syntactic forms', (done) => {
    expect(syntaxCheck(program)).toBe(true);
    done();
  });
});