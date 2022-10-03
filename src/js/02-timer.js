import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let initDate = null;
const currentDate = Date.now();
const btnStart = document.querySelector("button[data-start]");
btnStart.disabled = true;
const input = document.querySelector(".timer");
const inputF = document.querySelector(".field");



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),  
  minuteIncrement: 1,
  onClose(selectedDates) {
    initDate = selectedDates[0];      
      if (initDate > currentDate) {
      btnStart.disabled = false;
    } else {Notify.failure("Please choose a date in the future");
    }; 
  },
};

const fpickr = flatpickr("#datetime-picker", options);
const daysEl = document.querySelector("span[data-days]");
const hoursEl = document.querySelector("span[data-hours]");
const minutesEl = document.querySelector("span[data-minutes]");
const secondsEl = document.querySelector("span[data-seconds]");

btnStart.addEventListener("click", (() => {
  const intervalId = setInterval (() => {
    const currentDate = Date.now();
    let alfaDate = initDate - currentDate;
    daysEl.textContent = convertMs(alfaDate).days;
    hoursEl.textContent = convertMs(alfaDate).hours;
    minutesEl.textContent = convertMs(alfaDate).minutes;
    secondsEl.textContent = convertMs(alfaDate).seconds;
    btnStart.disabled = true;
    fpickr.input.setAttribute("disabled", "disabled")
  }, 1000);
}));

function addLeadingZero (value){
  return String(value).padStart(2, "0");
};
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};