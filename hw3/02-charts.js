const backgroundColors = [
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(199, 199, 199, 0.8)",
  "rgba(83, 102, 255, 0.8)",
  "rgba(40, 159, 64, 0.8)",
  "rgba(210, 199, 199, 0.8)",
  "rgba(78, 52, 199, 0.8)",
];

const borderColors = [
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(255, 99, 132, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(159, 159, 159, 1)",
  "rgba(83, 102, 255, 1)",
  "rgba(40, 159, 64, 1)",
  "rgba(210, 199, 199, 1)",
  "rgba(78, 52, 199, 1)",
];

// url for the Thrones API
const url = "https://thronesapi.com/api/v2/Characters";
const donutChart = document.querySelector(".donut-chart");
let housesObject = {};

function cleanfamilyName(family) {
  family = family.replace(/House/, "").trim();
  if (family.includes("Lanister")) family = "Lannister";
  else if (family.includes("None")) family = "Unknown";
  else if (family.includes("Unkown")) family = "Unknown";
  else if (family.includes("Targaryan")) family = "Targaryen";
  else if (family.includes("Targaryn")) family = "Targaryen";
  else if (family === "") family = "Unknown";
  return family;
}
function groupHouses(housesObject) {
  let newHouseObject = {};
  for (const key of Object.keys(housesObject)) {
    if (housesObject[key] === 1) {
      if ("Others" in newHouseObject) {
        newHouseObject["Others"] = newHouseObject["Others"] + 1;
      } else {
        newHouseObject["Others"] = 1;
      }
    } else {
      newHouseObject[key] = housesObject[key];
    }
  }
  return newHouseObject;
}
const renderChart = (houseLabels, houseValues) => {
  new Chart(donutChart, {
    type: "doughnut",
    data: {
      labels: houseLabels,
      datasets: [
        {
          label: "My First Dataset",
          data: houseValues,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Exercise 02 - Charts",
        fontSize: 40,
      },
      plugins: {
        labels: {
          fontSize: 10,
        },
      },
      legend: {
        position: "bottom",
      },
    },
  });
};
const calculateHouseMembers = async function () {
  try {
    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.forEach((element) => {
      let { family } = element;
      family = cleanfamilyName(family);

      if (family in housesObject) {
        housesObject[family] = housesObject[family] + 1;
      } else {
        housesObject[family] = 1;
      }
    });
    const newGroupedHouses = groupHouses(housesObject);
    renderChart(Object.keys(newGroupedHouses), Object.values(newGroupedHouses));
  } catch (err) {
    const chartContainer = document.querySelector(".chartContainer");
    donutChart.remove();
    const errorMessage = document.createElement("h2");
    errorMessage.classList.add("text-center");
    errorMessage.innerHTML =
      "Error: Unable to fetch Data from the URL information found!";
    chartContainer.appendChild(errorMessage);
  }
};
calculateHouseMembers();

// reference : https://www.makeuseof.com/javascript-dictionaries-create-use/
