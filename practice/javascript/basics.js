/**
 * JavaScript Fundamentals: Variable Scope, Functions, Closures, and Timers
 */

// 1. Function scope (var) vs. Block scope (let / const)
function demonstrateScope() {
  var functionScoped = "Accessible throughout the function";

  if (true) {
    let blockScoped = "Accessible only inside this if-block";
    console.log(blockScoped);
  }

  console.log(functionScoped);
}

demonstrateScope();

// 2. Reassignment and redeclaration rules
const fixedRate = 5;
// fixedRate = 6; // TypeError: Assignment to constant variable

let counter = 5;
counter = 11; // Valid: 'let' allows reassignment within the same scope
console.log("Updated counter:", counter);

var legacyValue = 20;
var legacyValue = 50; // 'var' permits redeclaration in the same scope (avoid in modern JS)
console.log("Legacy var value:", legacyValue);

// 3. Functions and Template Literals
function formatWelcomeMessage(roleTitle) {
  console.log(`Welcome, ${roleTitle}! Ready to start the session.`);
}

formatWelcomeMessage("Developer");

function addNumbers(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

console.log("Sum:", addNumbers(14, 26));

// 4. Immediately Invoked Function Expression (IIFE) & Lexical Closure
(function outerScope(outerValue) {
  return (function innerScope(innerValue) {
    console.log("Captured outer value via closure:", outerValue, "| Inner value:", innerValue);
  })(2);
})(1);

// 5. Asynchronous Timers & Loop Variable Binding (let vs. var)
// Using 'let' creates a fresh binding for each loop iteration (logs 0, 1, 2)
for (let i = 0; i < 3; i++) {
  setTimeout(function logBlockScopedIndex() {
    console.log("Block-scoped index (let):", i);
  }, i * 500);
}

// Using 'var' shares a single function-scoped binding across iterations (logs 3, 3, 3)
for (var j = 0; j < 3; j++) {
  setTimeout(function logFunctionScopedIndex() {
    console.log("Shared-scope index (var):", j);
  }, (j + 3) * 500);
}
