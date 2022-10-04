import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let timerId = null;
const btnStart = document.querySelector("button[data-start]");
btnStart.disabled = true;
const day = document.querySelector("span[data-days]");
const hour = document.querySelector("span[data-hours]");
const minute = document.querySelector("span[data-minutes]");
const second = document.querySelector("span[data-seconds]");
const input = document.querySelector('#datetime-picker');
const timerHtml = document.querySelector('.timer');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),  
  minuteIncrement: 1,
  onClose(selectedDates) {
    const { defaultDate } = this.config;   
    if (selectedDates[0] < defaultDate) {
      Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      Notify.success('Date is correct');
      btnStart.disabled = false;
    }; 
  },
};

flatpickr(input, options);

btnStart.addEventListener('click', startTimer);

function startTimer() {
  timerId = setInterval(() => {
    const timerData = new Date(input.value) - new Date();

    btnStart.disabled = true;

    if (timerData >= 0) {
      const timeObject = convertMs(timerData);

      day.textContent =  addLeadingZero(timeObject.days);
      hour.textContent = addLeadingZero(timeObject.hours);
      minute.textContent = addLeadingZero(timeObject.minutes);
      second.textContent = addLeadingZero(timeObject.seconds);

      if (timerData <= 10000) {
        timerHtml.style.color = 'red';
      }
    } else {
      Notify.success('Countdown finished');
      timerHtml.style.color = 'black';
      clearInterval(timerId);
    }
  }, 1000);
}

function addLeadingZero (value) {
  return value.toString().padStart(2, '0');
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