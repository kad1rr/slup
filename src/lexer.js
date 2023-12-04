const keywords = require("./keywords.js");

module.exports = class Lexer {
  constructor(input) {
    this._input = input;
    this._pos = 0;
    this._tokens = [];
    this._code = input.trim().split("");
    this._line = 1;
  }

  TokenTypes = require("./tokens.js");

  token = (type, value) => {
    return {
      type,
      value,
    };
  };

  tokenize(input = this._code) {
    while (this._pos < input.length) {
      switch (input[this._pos]) {
        case "(":
          this._tokens.push(this.token(this.TokenTypes.LParen, "("));
          this._pos++;
          break;
        case ")":
          this._tokens.push(this.token(this.TokenTypes.RParen, ")"));
          this._pos++;
          break;
        case "{":
          this._tokens.push(this.token(this.TokenTypes.LBrace, "{"));
          this._pos++;
          break;
        case "}":
          this._tokens.push(this.token(this.TokenTypes.RBrace, "}"));
          this._pos++;
          break;
        case "[":
          this._tokens.push(this.token(this.TokenTypes.LBracket, "["));
          this._pos++;
          break;
        case "]":
          this._tokens.push(this.token(this.TokenTypes.RBracket, "]"));
          this._pos++;
          break;
        case ",":
          this._tokens.push(this.token(this.TokenTypes.Comma, ","));
          this._pos++;
          break;
        case ".":
          this._tokens.push(this.token(this.TokenTypes.Dot, "."));
          this._pos++;
          break;
        case "=":
          this._tokens.push(this.token(this.TokenTypes.Equals, "="));
          this._pos++;
          break;
        case "+":
          this._tokens.push(this.token(this.TokenTypes.Plus, "+"));
          this._pos++;
          break;
        case "-":
          this._tokens.push(this.token(this.TokenTypes.Minus, "-"));
          this._pos++;
          break;
        case "*":
          this._tokens.push(this.token(this.TokenTypes.Star, "*"));
          this._pos++;
          break;
        case "/":
          this._tokens.push(this.token(this.TokenTypes.Slash, "/"));
          this._pos++;
          break;
        case "<":
          this._tokens.push(this.token(this.TokenTypes.LessThan, "<"));
          this._pos++;
          break;
        case ">":
          this._tokens.push(this.token(this.TokenTypes.GreaterThan, ">"));
          this._pos++;
          break;
        case " " || "\t":
          this._pos++;
          break;
        case "\n":
          this._pos++;
          this._line++;
          break;
        default:
          if (input[this._pos] === "<" && input[this._pos + 1] === "=") {
            this._tokens.push(this.token(this.TokenTypes.LessThanEqual, "<="));
            this._pos += 2;
            break;
          } else if (input[this._pos] === ">" && input[this._pos + 1] === "=") {
            this._tokens.push(
              this.token(this.TokenTypes.GreaterThanEqual, ">=")
            );
            this._pos += 2;
            break;
          } else if (input[this._pos] === "*" && input[this._pos + 1] === "*") {
            this._tokens.push(this.token(this.TokenTypes.TStar, "**"));
            this._pos += 2;
            break;
          } else if (input[this._pos] === '"') {
            let stringLiteral = "";
            this._pos++;
            while (this._pos < input.length && input[this._pos] !== '"') {
              stringLiteral += input[this._pos];
              this._pos++;
            }
            if (input[this._pos] === '"') {
              this._tokens.push(
                this.token(this.TokenTypes.String, stringLiteral)
              );
              this._pos++;
            }
          } else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(input[this._pos])) {
            let identifier = "";
            while (
              this._pos < input.length &&
              /^[a-zA-Z_0-9]$/.test(input[this._pos])
            ) {
              identifier += input[this._pos];
              this._pos++;
            }
            if (keywords.includes(identifier)) {
              this._tokens.push(
                this.token(this.TokenTypes.Keyword, identifier)
              );
            } else {
              this._tokens.push(
                this.token(this.TokenTypes.Identifier, identifier)
              );
            }
          } else if (/^\d+$/.test(input[this._pos])) {
            let number = "";
            while (this._pos < input.length && /^\d$/.test(input[this._pos])) {
              number += input[this._pos];
              this._pos++;
            }
            this._tokens.push(
              this.token(this.TokenTypes.Number, parseInt(number, 10))
            );
          } else if (input[this._pos] === "&" && input[this._pos + 1] === "&") {
            this._tokens.push(this.token(this.TokenTypes.And, "&&"));
            this._pos += 2;
          } else if (input[this._pos] === "|" && input[this._pos + 1] === "|") {
            this._tokens.push(this.token(this.TokenTypes.Or, "||"));
            this._pos += 2;
          } else if (input[this._pos] === "!" && input[this._pos + 1] === "=") {
            this._tokens.push(this.token(this.TokenTypes.Not, "!="));
            this._pos += 2;
          } else if (input[this._pos] === "+" && input[this._pos + 1] === "+") {
            this._tokens.push(this.token(this.TokenTypes.PlusPlus, "++"));
            this._pos += 2;
          } else if (input[this._pos] === "-" && input[this._pos + 1] === "-") {
            this._tokens.push(this.token(this.TokenTypes.MinusMinus, "--"));
            this._pos += 2;
          }
      }

      this._pos++;
    }
    this._tokens.push(this.token(this.TokenTypes.END, "\n"));
  }
};
