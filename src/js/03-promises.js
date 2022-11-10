import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(event) {
  event.preventDefault();
  const amountValue = Number(formRef.amount.value);
  let delayValue = Number(formRef.delay.value);
  const stepValue = Number(formRef.step.value);
  for (let index = 0; index < amountValue; index += 1) {
    const position = index + 1;
    delayValue += stepValue;
    createPromise(position, delayValue)
      .then(message => Notiflix.Notify.success(message))
      .catch(error => Notiflix.Notify.success(error));
  }
}

function createPromise(position, delayValue) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delayValue}ms`);
      }
      reject(`❌ Rejected promise ${position} in ${delayValue}ms`);
    }, delayValue);
  });
}
