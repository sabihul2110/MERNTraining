/**
 * Asynchronous JavaScript: Promises, Async/Await, and the Event Loop
 *
 * Part 1: Refactoring callback workflows into Promises consumed with async/await.
 * Part 2: Understanding execution order between the Call Stack, Microtask Queue,
 *         and Macrotask (Timer) Queue.
 */

function delayStep(stepMessage, completionMessage, durationMs = 800) {
  console.log(stepMessage);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(completionMessage);
      resolve(completionMessage);
    }, durationMs);
  });
}

function placeOrder() {
  return delayStep(
    "Payment is in progress...",
    "Payment confirmed: your order has been placed."
  );
}

function prepareOrder() {
  return delayStep(
    "Order preparation has started...",
    "Order has been prepared and packed."
  );
}

function handoffToCourier() {
  return delayStep(
    "Awaiting courier pickup...",
    "Order has been picked up by the courier."
  );
}

function deliverOrder() {
  return delayStep(
    "Order is out for delivery...",
    "Order has been delivered!"
  );
}

async function processOrderLifecycle() {
  await placeOrder();
  await prepareOrder();
  await handoffToCourier();
  await deliverOrder();
}

// Demonstration of the Event Loop (Call Stack vs. Microtasks vs. Macrotasks)
function demonstrateEventLoop() {
  console.log("\n--- Event Loop Execution Order ---");
  console.log("1. Synchronous log A (Call Stack)");

  setTimeout(() => {
    console.log("5. Delayed Timer D - 100ms (Macrotask Queue)");
  }, 100);

  Promise.resolve().then(() => {
    console.log("3. Resolved Promise F (Microtask Queue runs before timers)");
  });

  setTimeout(() => {
    console.log("4. Zero-delay Timer C - 0ms (Macrotask Queue)");
  }, 0);

  console.log("2. Synchronous log B (Call Stack)");
}

demonstrateEventLoop();
setTimeout(processOrderLifecycle, 300);
