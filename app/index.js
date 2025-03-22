// Get DOM elements
const display = document.querySelector("#display");
const expression = document.querySelector("#expression");
const buttons = document.querySelectorAll("button");
// Get the seperate buttons and map to store the text value and data value
const controls = [...document.querySelectorAll("[data-type='controls']")].map(
  (control) => ({
    value: control.dataset.value,
    visual: control.textContent.trim(),
  }),
);
const numbers = [...document.querySelectorAll("[data-type='number']")].map(
  (number) => ({
    value: number.dataset.value,
    visual: number.textContent.trim(),
  }),
);
const operators = [...document.querySelectorAll("[data-type='operator']")].map(
  (operator) => ({
    value: operator.dataset.value,
    visual: operator.textContent.trim(),
  }),
);

// Input array
let input = [];

const handleInput = (e) => {
  // Get all buttons and store in an array
  const buttonList = [...controls, ...numbers, ...operators];
  // Store the value of the button clicked
  const value = e.target.dataset.value;
  // Find the button clicked
  const button = buttonList.find((b) => b.value === value);

  // Sanitize for XSS
  if (!sanitize(button.value)) {
    throw new Error("I don't recognize this input..🤨");
  }

  // Backspace previous input
  if (button.value === "backspace") {
    backspace();
    return;
  }

  // Clear display
  if (button.value === "clear") {
    clearDisplay();
    return;
  }

  // Calculate
  if (button.value === "=") {
    calculate();
    return;
  }

  // Display result
  input.push(button.value);
  display.textContent = input.join("");
};

const clearDisplay = () => {
  input = [];
  display.textContent = "0";
  return;
};

const backspace = () => {
  if (input.length === 0) {
    return;
  } else if (input.length === 1) {
    input = [];
    display.textContent = "0";
    return;
  }
  input.pop();
  display.textContent = input.join("");
  return;
};

const sanitize = (val) => {
  const isControls = controls.some((control) => control.value === val);
  const isNumber = numbers.some((number) => number.value === val);
  const isOperator = operators.some((operator) => operator.value === val);

  return isControls || isNumber || isOperator;
};

const calculate = () => {
  // Safeguard for calculate if the last input is an operator
  if (operators.includes(input[input.length - 1])) {
    return;
  }

  // Run calculation of input string using eval()
  const ans = eval(input.join(""));
  // Update display with result
  display.textContent = ans;
  // Update expression with input
  expression.textContent = input.join("");

  // Reset input array
  input = [];
  // Add result to input array
  input = ans.toString().split("");
  return;
};

buttons.forEach((button) => {
  button.addEventListener("click", handleInput);
});
