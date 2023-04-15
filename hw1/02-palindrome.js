const elem = document.querySelector("input");
const resultElement = document.querySelector("#resultElement");
elem.addEventListener("input", handleInput);

function handleInput() {
  const input = parseInt(elem.value);
  if (input >= 0) {
    const reverseInput = parseInt(
      String(elem.value).split("").reverse().join("")
    );
    if (input === reverseInput) {
      updateResultElement("text-success", "Yes. This is a palindrome!");
    } else {
      updateResultElement("text-danger", "No. Try again.");
    }
  } else if (input < 0) {
    updateResultElement("text-danger", "Enter a positive number!");
  } else {
    updateResultElement("text-black", "Please enter a number first!");
  }
}

function updateResultElement(resultColorClass, resultTextString) {
  resultElement.classList = "";
  resultElement.classList.add(resultColorClass);
  resultElement.textContent = resultTextString;
}
