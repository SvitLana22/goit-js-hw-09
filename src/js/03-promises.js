import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(event) {
  event.preventDefault();
  const amountValue = Number(formRef.amount.value);
  let delayValue = Number(formRef.delay.value);
  const stepValue = Number(formRef.step.value);
  for (let index = 0; index < amountValue.length; index += 1) {
    const position = index + 1;
    delayValue += stepValue;
    createPromise(position, delay)
      .then(message => Notify.success(message))
      .catch(error => Notify.failure(error));
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}
