// // Add your code here
const inputWord = document.querySelector("#inputWord");
const textContainer = document.querySelector("#textContainer");

inputWord.addEventListener("keyup", () => {
  const searchText = inputWord.value.trim();
  const textContent = textContainer.textContent;
  if (searchText !== "") {
    const wordsArray = textContent.split(" ");
    const highlightedWordsArray = wordsArray.map((word) => {
      const trimmedWord = word.replace(/[^\w\s]/gi, "");
      return trimmedWord === searchText
        ? `<span class="bg-warning">${word}</span>`
        : word;
    });
    const highlightedText = highlightedWordsArray.join(" ");
    textContainer.innerHTML = highlightedText;
  } else {
    textContainer.innerHTML = textContainer.textContent;
  }
});
