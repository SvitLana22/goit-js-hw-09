import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dataTimeChoice: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userDate = null;
let intervalId = null;
refs.startBtn.setAttribute('disabled', true);
refs.startBtn.addEventListener('click', onStartBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDates) {
    userDate = selectedDates[0];

    if (userDate < Date.now()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }
    refs.startBtn.removeAttribute('disabled');
  },
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
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function onStartBtn() {
  intervalId = setInterval(() => {
    updateDate();
  }, 1000);
  refs.dataTimeChoice.disabled = true;
  refs.startBtn.disabled = true;
}

function updateDate() {
  const newDate = new Date();
  const selectedDate = new Date(refs.dataTimeChoice.value);
  const deltaDate = selectedDate - newDate;
  if (deltaDate < 0) {
    return;
  } else {
    const { days, hours, minutes, seconds } = convertMs(deltaDate);
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
  }
}
flatpickr(refs.dataTimeChoice, options);

// console.log(fp);
