// import Notiflix from 'notiflix';

// const formRef = document.querySelector('.form');
// formRef.addEventListener('submit', onBtnSubmit);

// function onBtnSubmit(event) {
//   event.preventDefault();
//   const amountValue = Number(formRef.amount.value);
//   let delayValue = Number(formRef.delay.value);
//   const stepValue = Number(formRef.step.value);
//   for (let index = 0; index < amountValue; index += 1) {
//     const position = index + 1;
//     delayValue += stepValue;
//     createPromise(position, delayValue)
//       .then(message => Notiflix.Notify.success(message))
//       .catch(error => Notiflix.Notify.success(error));
//   }
// }

// function createPromise(position, delayValue) {
//   const shouldResolve = Math.random() > 0.3;
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve(`✅ Fulfilled promise ${position} in ${delayValue}ms`);
//       }
//       reject(`❌ Rejected promise ${position} in ${delayValue}ms`);
//     }, delayValue);
//   });
// }

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  dateTimePicker: document.querySelector('#datetime-picker'),
};
let userDate = null;
refs.startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0];
    if (userDate > Date.now()) {
      refs.startBtn.removeAttribute('disabled');
    } else {
      Notify.failure('Please choose a date in the future', {
        position: 'center-center',
        clickToClose: true,
      });
      return;
    }
    userDate = selectedDates[0].getTime();
  },
};
flatpickr(refs.dateTimePicker, options);
let intervalId = null;
refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  intervalId = setInterval(() => {
    updateTime();
  }, 1000);
  refs.dateTimePicker.disabled = true;
  refs.startBtn.disabled = true;
}

function updateTime() {
  const currentTime = new Date();
  const selectedTime = new Date(refs.dateTimePicker.value);

  const deltaTime = selectedTime - currentTime;

  if (deltaTime < 0) {
    return;
  } else {
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
  }
}

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
