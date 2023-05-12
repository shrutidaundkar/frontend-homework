import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
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
const url = "https://thronesapi.com/api/v2/Characters";

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
function Houses() {
  const [houseLabels, setHouseLabels] = useState([]);
  const [houseValues, sethouseValues] = useState([]);

  const getDataFromAPi = async () => {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      let housesObject = {};
      jsonData.forEach((element) => {
        let { family } = element;
        family = cleanfamilyName(family);

        if (family in housesObject) {
          housesObject[family] = housesObject[family] + 1;
        } else {
          housesObject[family] = 1;
        }
      });
      housesObject = groupHouses(housesObject);
      setHouseLabels(Object.keys(housesObject));
      sethouseValues(Object.values(housesObject));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDataFromAPi();
  }, []);

  const data = {
    labels: houseLabels,
    datasets: [
      {
        label: "# of members in house",
        data: houseValues,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: { font: { size: 20 } },
        title: {
          display: true,
          padding: 10,
          font: {
            size: 40,
          },
          text: "House of Dragons",
          position: "top",
        },
      },
    },
    responsive: true,
  };
  return (
    <div className="doughnutContainer">
      <Doughnut
        data={data}
        aria-label="House Count Information"
        options={options}
        width={500}
        height={800}
      />
    </div>
  );
}

export default Houses;
