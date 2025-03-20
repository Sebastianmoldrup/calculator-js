// Get DOM elements
const display = document.querySelector("#display");
const expression = document.querySelector("#expression");
const buttons = document.querySelectorAll("button");

// Variables
let input = [];
const operators = ["÷", "×", "−", "+", "%", "±", "."];

// Click function to handle event
const handleClick = (e) => {
  // Store target value in variable
  const val = e.target.innerText.trim();
  // Check if value is an operator and store in variable
  const currOperator = operators.includes(val);
  // Check if previous value is an operator and store in variable
  const prevOperator = operators.includes(input[input.length - 1]);

  // Calculate equation
  if (val === "=" && input.length) {
    handleCalculation();
    return;
  }

  // Clear display
  if (val === "C") {
    display.innerText = "";
    input = [];
    return;
  }

  // Only allow first val to be number or -
  if (!input.length && currOperator && val !== "−") {
    return;
  }

  // Dont allow multiple operators
  if (prevOperator && currOperator) {
    return;
  }

  // Push value to input array && add input to display
  input.push(val);
  display.innerText = input.join("");
};

// Calculate function
const handleCalculation = () => {
  // Operator actions
  const actions = {
    "÷": (a, b) => a / b,
    "×": (a, b) => a * b,
    "−": (a, b) => a - b,
    "+": (a, b) => a + b,
    "%": (a, b) => a % b,
    "±": (a, b) => [a + b, a - b],
  };

  // Format the array and store in tokens
  const tokens = input
    // Join array together into a string
    .join("")
    // Split string into array with numbers and operators
    .split(/(\d+)/)
    // Filter out empty values
    .filter((val) => val);
  console.log(tokens);

  // Iterate through tokens
  tokens.forEach((val, i) => {
    // Store previous and next values in variables
    const prev = input[i - 1];
    const next = input[i + 1];
  });
};

// Event listener for each button
buttons.forEach((button) => button.addEventListener("click", handleClick));
