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
  FunctionDeclaration,
  IfStatement,
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
    new Program([])
  ]
};

console.log("hi");

console.log(parse(fixture["funcdecAndCall"][0]));

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
