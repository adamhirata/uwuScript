/*
 * Parser Tests
 *
 * These tests check that the parser produces the AST that we expect.
 *
 * Note we are only checking syntactic forms here, so our test programs
 * may have semantic errors.
 */

const parse = require("../parser");

const {
  Argument,
  ArrayExpression,
  ArrayType,
  AssignmentStatement,
  BinaryExpression,
  BooleanLiteral,
  BooleanType,
  BreakStatement,
  Call,
  DictionaryExpression,
  DictionaryType,
  ForStatement,
  FunctionDeclaration,
  IfStatement,
  KeyValPair,
  LargeBlock,
  NumericLiteral,
  NumType,
  Parameter,
  Program,
  ReturnStatement,
  StringLiteral,
  StringType,
  SubscriptedExpression,
  TinyBlock,
  TernaryStatement,
  UnaryExpression,
  VariableDeclaration,
  Variable,
  WhileStatement
} = require("..");

const fixture = {
  // hello: [
  //   String.raw`write 0, x;`,
  //   new Program(
  //     new Block([
  //       new WriteStatement([
  //         new IntegerLiteral("0"),
  //         new VariableExpression("x")
  //       ])
  //     ])
  //   )
  // ],
  funcdecAndCall: [
    String.raw`Numbwer avg (Numbwer num = 5 ) uwu retuwn 5 owo
      avg(7)
      `,
    new Program([
      new FunctionDeclaration(
        NumType,
        "avg",
        [new Parameter(NumType, "num", new NumericLiteral(5))],
        new TinyBlock([new ReturnStatement([new NumericLiteral(5)])])
      ),
      new Call(new Variable("avg"), [new Argument([], new NumericLiteral(7))])
    ])
  ],
  stringStuff: [
    String.raw`Stwing test = "test"
    test = "oof"
    Awway<Stwing> arr = [test]
    print(arr[1])
    `,
    new Program([
      new VariableDeclaration(StringType, "test", new StringLiteral('"test"')),
      new AssignmentStatement(new Variable("test"), new StringLiteral('"oof"')),
      new VariableDeclaration(
        new ArrayType(StringType),
        "arr",
        new ArrayExpression([new Variable("test")])
      ),
      new Call(new Variable("print"), [
        new Argument(
          [],
          new SubscriptedExpression(new Variable("arr"), new NumericLiteral(1))
        )
      ])
    ])
  ],
  boolsAndOpsAndBlocks: [
    String.raw`Boowean test = fawse
    wile (!(test)) uwu
      bweak
    owo
    if (test) uwu owo ewse if (test) uwu owo
    ewse uwu owo
    fow i in 0...10 uwu Boowean boo = 2 == 3 owo
    Numbwer j = 1 + 2
    Numbwer k = 1 * 2
    Boow boo = twue || fawse
    Boow test = twue && fawse
    test ? yay ewse boo
    `,
    new Program([
      new VariableDeclaration(BooleanType, "test", new BooleanLiteral("fawse")),
      new WhileStatement(
        new UnaryExpression("!", new Variable("test")),
        new LargeBlock([new BreakStatement()])
      ),
      new IfStatement(
        [new Variable("test"), new Variable("test")],
        [new TinyBlock([]), new TinyBlock([])],
        new TinyBlock([])
      ),
      new ForStatement(
        "i",
        new NumericLiteral(0),
        new NumericLiteral(10),
        new TinyBlock([
          new VariableDeclaration(
            BooleanType,
            "boo",
            new BinaryExpression(
              "==",
              new NumericLiteral(2),
              new NumericLiteral(3)
            )
          )
        ])
      ),
      new VariableDeclaration(
        NumType,
        "j",
        new BinaryExpression("+", new NumericLiteral(1), new NumericLiteral(2))
      ),
      new VariableDeclaration(
        NumType,
        "k",
        new BinaryExpression("*", new NumericLiteral(1), new NumericLiteral(2))
      ),
      new VariableDeclaration(
        BooleanType,
        "boo",
        new BinaryExpression(
          "||",
          new BooleanLiteral("twue"),
          new BooleanLiteral("fawse")
        )
      ),
      new VariableDeclaration(
        BooleanType,
        "test",
        new BinaryExpression(
          "&&",
          new BooleanLiteral("twue"),
          new BooleanLiteral("fawse")
        )
      ),
      new TernaryStatement(
        new Variable("test"),
        new Variable("yay"),
        new Variable("boo")
      )
    ])
  ],
  emptyList: [
    String.raw`print()
  `,
    new Program([new Call(new Variable("print"), [])])
  ],
  dictionaries: [
    String.raw`Dict<Stwing to Stwing> test = {"hi" to "hihi", "oof" to "oofoof"}
    `,
    new Program([
      new VariableDeclaration(
        new DictionaryType(StringType, StringType),
        "test",
        new DictionaryExpression([
          new KeyValPair(
            new StringLiteral('"hi"'),
            new StringLiteral('"hihi"')
          ),
          new KeyValPair(
            new StringLiteral('"oof"'),
            new StringLiteral('"oofoof"')
          )
        ])
      )
    ])
  ]
};

describe("The parser", () => {
  Object.entries(fixture).forEach(([name, [source, expected]]) => {
    test(`produces the correct AST for ${name}`, done => {
      expect(parse(source)).toEqual(expected);
      done();
    });
  });

  test("throws an exception on a syntax error", done => {
    // We only need one test here that an exception is thrown.
    // Specific syntax errors are tested in the grammar test.
    expect(() => parse("as$df^&%*$&")).toThrow();
    done();
  });
});
