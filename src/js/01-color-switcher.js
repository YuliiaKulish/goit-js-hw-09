const bodyRef = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const TIME_DELAY = 1000;
let timerId = null;

startBtn.addEventListener('click', onStartChangeColor);
stopBtn.addEventListener('click', onStopChangeColor);
stopBtn.setAttribute('disabled', 'disabled');

function onStartChangeColor() {
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = `${getRandomHexColor()}`;
  }, TIME_DELAY);
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');
};

function onStopChangeColor() {
  clearInterval(timerId);
  stopBtn.setAttribute('disabled', 'disabled');
  startBtn.removeAttribute('disabled');
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};