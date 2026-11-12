/**
 * DOM Selection & Content Inspection Fundamentals
 *
 * Demonstrates standard element selection APIs and the differences
 * between innerText, textContent, and innerHTML.
 */

// 1. Selecting elements using standard DOM APIs
const headingById = document.getElementById("main-heading");
const headingsByTag = document.getElementsByTagName("h1");
const headingsByClass = document.getElementsByClassName("heading-title");

// 2. Selecting elements using CSS selectors (# for ID, . for class)
const headingByQuery = document.querySelector("#main-heading");
const headingByClassQuery = document.querySelector(".heading-title");

// 3. Comparing innerText vs. textContent vs. innerHTML
if (headingByQuery) {
  // innerText returns only visible text (ignores elements with display: none)
  console.log("Visible text (innerText):", headingByQuery.innerText);

  // textContent returns all text content, including hidden elements
  console.log("Full text (textContent):", headingByQuery.textContent.trim());

  // innerHTML returns the complete HTML markup inside the element
  console.log("Raw markup (innerHTML):", headingByQuery.innerHTML.trim());
}

/*
 * Follow-up Practice Topics:
 * - Event listeners (addEventListener / removeEventListener)
 * - Event propagation phases: Capturing, Target, and Bubbling
 */
