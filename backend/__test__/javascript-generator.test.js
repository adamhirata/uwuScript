/*
 * JavaScript Code Generator Tests
 *
 * These tests check that the JavaScript generator produces the target
 * JavaScript that we expect.
 */

const parse = require("../../ast/parser");
const analyze = require("../../semantics/analyzer");
const generate = require("../javascript-generator");

const fixture = {
  hello: [
    String.raw`pwint("Hello world")
            `,
    String.raw`console.log("Hello world");`,
  ],
  arithmetic: [
    String.raw`6 * -9 + 420
          `,
    String.raw`((6 * (-9)) + 420)`,
  ],
  substring: [
    String.raw`Stwing a = "adamhirata"
          Stwing name = substwing(a, 0, 4)
          `,
    /let a_(\d+) = "adamhirata";\s*let name_\d+ = a_\1\.substring\(0, 4\);/,
  ],
  Assignment: [
    String.raw`Numbwer x = 2
      x = 5
      `,
    /let x_(\d+) = 2;\s*x_(\d+) = 5;/,
  ],
  binary: [
    String.raw`21 <= 23
    4 != 20
    twue && twue
    twue != fawse
    twue == !fawse
    1000 + 98
    (9 / 3) + ((2 * 6) % 4) - 1
    `,
    String.raw`(21 <= 23);
(4 !== 20);
(true && true);
(true !== false);
(true === (!false));
(1000 + 98);
(((9 / 3) + ((2 * 6) % 4)) - 1);`,
  ],
  ifStatement: [
    String.raw`if (1 < 2) uwu 1 owo
          `,
    /if \(\(1 < 2\)\) \{\s*1;\s*\};/,
  ],
  ifElseIfStatement: [
    String.raw`if (1 < 2)  uwu 1 owo
      ewse if (1 > 2) uwu 2 owo`,
    /if \(\(1 < 2\)\) \{\s*1;\s*\} else if \(\(1 > 2\)\) \{\s*2;\s*\};/,
  ],
  ifElseIfElseStatement: [
    String.raw`if (1 < 2) uwu 1 owo
      ewse if (1 > 2) uwu 2 owo
      ewse uwu 3 owo`,
    /if \(\(1 < 2\)\) \{\s*1;\s*\} else if \(\(1 > 2\)\) \{\s*2;\s*\} else \{\s*3;\s*\};/,
  ],
  whileLoopWithBreak: [
    String.raw`wile(twue) uwu bweak owo`,
    /while \(true\) \{\s*break;\s*\};/,
  ],
  forLoop: [
    String.raw`fow i in 0...10 uwu
            pwint("UwU :)")
          owo
          `,
    /for \(let i_(\d+) = 0; i_\1 <= 10; i_\1 \+= 1\) \{\s*console.log\("UwU :\)"\);\s*\};/,
  ],
  array: [
    String.raw`Awway<Numbwer> nums = [1,2,3,4]
          `,
    /let nums_(\d+) = \[\s*1,\s*2,\s*3,\s*4\s*\];/,
  ],

  //   listExpression: [
  //     String.raw`Aww<Numbwer> favLakers = [23, 8, 24, 33, 34]
  // Numbwer goat = favLakers[2]
  // `,
  //     /let favLakers(\d+) = \[\s*23,\s*8,\s*24,\s*33,\s*34\s*\];\s*let goat\d+ = favLakers\1\[2\];/,
  //   ],

  functionAdd: [
    String.raw`Numbwer add(Numbwer a, Numbwer b) uwu
          retuwn a + b
        owo
        `,
    /function add_(\d+)\(a_(\d+), b_(\d+)\) \{\s*return \(a_(\d+) \+ b_(\d+)\);\s*\}/,
  ],

  ternary: [
    String.raw`2 < 3 ? pwint(2) ewse pwint(3)`,
    String.raw`(2 < 3) ? console.log(2) : console.log(3);`,
  ],

  call: [
    String.raw`Numbwer f (Numbwer x, Stwing y) uwu
      retuwn x
    owo
    f(1, "")
    `,
    /function f_(\d+)\(x_(\d+), y_\d+\) \{\s*return x_\2;\s*\};\s*f_\1\(1, ""\);/,
  ],

  dictionary: [
    String.raw`Dictionawy<Stwing to Stwing> d = {"forney" to "hustler", "toal" to "wizard"}
    `,
    /let d_\d+ = \{\s*forney: "hustler",\s*toal: "wizard"\s*\};/,
  ],
  length: [
    String.raw`length("hello")
  `,
    String.raw`"hello".length`,
  ],
};

describe("The JavaScript generator", () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct output for ${name}`, (done) => {
      const ast = parse(source);
      analyze(ast);
      expect(generate(ast)).toMatch(expected);
      done();
    });
  });
});
