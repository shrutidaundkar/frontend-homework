// url for the Thrones API
const url = "https://thronesapi.com/api/v2/Characters";

const charContainer = document.querySelector("#characters");
const printCharacters = async function () {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();

    charContainer.classList.add("card-deck");
    jsonData.forEach((element) => {
      const { fullName, title, family, imageUrl } = element;
      //card
      const charDiv = document.createElement("div");
      charDiv.classList.add("card");

      //card image
      const charImage = document.createElement("img");
      charImage.classList.add("card-img");
      charImage.src = imageUrl;

      if (family.includes("House")) {
        charImage.alt = `${fullName} of ${family}`;
      } else {
        family.includes("Free") |
        family.includes("Unk") |
        family.includes("None")
          ? (charImage.alt = `${fullName} - ${title}`)
          : (charImage.alt = `${fullName} of House ${family}`);
      }
      //card-body div
      const charNameDiv = document.createElement("div");
      charNameDiv.classList.add("card-body");

      //card-body-text fullName
      const charName = document.createElement("span");
      charName.classList.add("card-title");
      charName.innerHTML = fullName;

      //card-body title
      const charTitle = document.createElement("p");
      charTitle.classList.add("card-text");
      charTitle.innerHTML = title;

      //add name and title to div
      charNameDiv.appendChild(charImage);
      charNameDiv.appendChild(charName);
      charNameDiv.appendChild(charTitle);

      //add img and charname to card
      charDiv.appendChild(charNameDiv);
      charContainer.appendChild(charDiv);
    });
  } catch (err) {
    const errorMessage = document.createElement("span");
    errorMessage.classList.add("text-center");
    errorMessage.classList.add("h3");
    errorMessage.innerHTML = "No information found!";
    charContainer.appendChild(errorMessage);
  }
};
printCharacters();
