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
  const start = () => {
    currentInterval = setInterval(updateColor, intervalInput.value * 1000);
    setButton("Stop", "btn-danger", "btn-primary");
  };
  const stop = () => {
    clearInterval(currentInterval);
    setButton("Start", "btn-primary", "btn-danger");
  };

  const setButton = (text, classToBeAdded, classToBeRemoved) => {
    startStopButton.value = text;
    startStopButton.classList.add(classToBeAdded);
    startStopButton.classList.remove(classToBeRemoved);
  };
  const startStopToggle = () => {
    userIntervalUpdated ? stop() : start();
    userIntervalUpdated = !userIntervalUpdated;
  };

  startStopButton.addEventListener("click", startStopToggle);
  startStopToggle();
});
