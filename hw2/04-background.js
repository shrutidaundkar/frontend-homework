// Add your code here
document.addEventListener("DOMContentLoaded", (event) => {
  const startStopButton = document.querySelector("#startStopButton");
  const intervalInput = document.querySelector("#intervalInput");
  let currentInterval;
  let userIntervalUpdated = false;

  const generateColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const a = 0.4;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };
  const updateColor = () => {
    document.body.style.backgroundColor = generateColor();
  };
  const start = (interval) => {
    currentInterval = setInterval(updateColor, interval * 1000);
  };
  const stop = () => {
    clearInterval(currentInterval);
  };

  const startStopToggle = () => {
    if (userIntervalUpdated) {
      stop();
      startStopButton.value = "Start";
      startStopButton.classList.add("btn-primary");
      startStopButton.classList.remove("btn-danger");
    } else {
      start(intervalInput.value);
      startStopButton.value = "Stop";
      startStopButton.classList.remove("btn-primary");
      startStopButton.classList.add("btn-danger");
    }
    userIntervalUpdated = !userIntervalUpdated;
  };

  startStopButton.addEventListener("click", startStopToggle);
  startStopToggle();
});
