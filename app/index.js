// Get DOM elements
const display = document.querySelector("#display");
const expression = document.querySelector("#expression");
const buttons = document.querySelectorAll("button");

let input = [];
const operatorKeys = ["÷", "×", "−", "+", "%", "DEL"];
const operators = {
  "×": "*",
  "÷": "/",
  "%": "%",
  "+": "+",
  "−": "-",
};

// Click function to handle event
const handleClick = (e) => {
  const val = e.target.innerText.trim();
  const currOperator = operatorKeys.includes(val);
  const prevOperator = operatorKeys.includes(input[input.length - 1]);

  // Calculate equation
  if (val === "=" && input.length) {
    handleCalculation();
    return;
  }

  // Clear display
  if (val === "AC") {
    display.innerText = "0";
    expression.innerText = "";
    input = [];
    return;
  }

  // Handle exponentation value
  if (input.length && val === "DEL") {
    input.pop();
    input.length
      ? (display.innerText = input.join(""))
      : (display.innerText = "0");
    return;
  }

  // Sanitize for XSS

  // First value must be of type number or string "-"
  if (!input.length && currOperator && val !== "−") {
    return;
  }

  // Dont allow stacking operators
  if (prevOperator && currOperator) {
    return;
  }

  // Push value to input array && add input to display
  input.push(val);
  display.innerText = input.join("");
};

// Calculate function
const handleCalculation = () => {
  const tokens = input
    .map((i) => {
      if (Object.keys(operators).includes(i)) {
        return operators[i];
      }
      return i;
    })
    .join("");

  display.innerText = eval(tokens);
  expression.innerText = input.join("");
};

// Event listener for each button
buttons.forEach((button) => button.addEventListener("click", handleClick));
