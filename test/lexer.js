// Import the Lexer module
const Lexer = require("../src/lexer.js");

// Delete the console
console.clear();

// Test scenario
const testCode = `
x = 42
y = "hello, world!"
if x > 0 && y !== null {
    print "Condition is true"
} else {
    print "Condition is false"
}
`;

// Create the Lexer instance
const lexer = new Lexer(testCode);

// Perform the tokenization process
lexer.tokenize();

// Print the obtained tokens
console.log("Tokens:");
console.log(lexer._tokens);

// Display debugging information for each token
console.log("\nToken Details:");
lexer._tokens.forEach((token, index) => {
  console.log(`Token ${index + 1}:`);
  console.log(`  Type: ${token.type}`);
  console.log(`  Value: ${token.value}`);
  console.log("\n---");
});
