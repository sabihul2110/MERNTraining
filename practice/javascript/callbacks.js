/**
 * Asynchronous JavaScript: Sequencing Operations with Callbacks
 *
 * Demonstrates how nested callbacks enforce sequential execution
 * across asynchronous steps (and why deeply nested callbacks lead
 * to "Callback Hell", motivating Promises and async/await).
 */

function placeOrder(nextStep) {
  console.log("1. Processing payment...");
  setTimeout(() => {
    console.log("   Payment verified. Order has been placed.");
    if (nextStep) nextStep();
  }, 1000);
}

function prepareOrder(nextStep) {
  console.log("2. Preparing your order...");
  setTimeout(() => {
    console.log("   Order preparation is complete.");
    if (nextStep) nextStep();
  }, 1000);
}

function packageForCourier(nextStep) {
  console.log("3. Packaging order for courier pickup...");
  setTimeout(() => {
    console.log("   Courier has picked up the package.");
    if (nextStep) nextStep();
  }, 1000);
}

function deliverOrder(nextStep) {
  console.log("4. Package is out for delivery...");
  setTimeout(() => {
    console.log("   Order delivered to the customer.");
    if (nextStep) nextStep();
  }, 1000);
}

function completeOrderWorkflow() {
  console.log("5. Requesting customer confirmation...");
  setTimeout(() => {
    console.log("   Order marked as completed. Thank you!");
  }, 1000);
}

// Sequential execution using nested callbacks
placeOrder(() => {
  prepareOrder(() => {
    packageForCourier(() => {
      deliverOrder(() => {
        completeOrderWorkflow();
      });
    });
  });
});
