const display = document.getElementById("display");
const expression = document.getElementById("expression");

const buttons = document.querySelectorAll("button");

const handleClick = (e) => {
  console.log(e.target.innerText.trim());
};

buttons.forEach((button) => button.addEventListener("click", handleClick));
