import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const formDelay = document.querySelector("input[name='delay']");

const btn = form.querySelector('button');

const clickHandler = () => {
  event.preventDefault();
  const delayValue = parseInt(formDelay.value);
  console.log(delayValue);
  const formFulfilt = form.elements[1].querySelector('input:checked').value;
  if (formFulfilt === 'fulfilled') {
    const timeOutId = setTimeout(() => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${delayValue + 'ms'}`,
      });
    }, delayValue);
  } else {
    const timeout = parseInt(formDelay.value);
    const timeOutId = setTimeout(() => {
      iziToast.error({
        title: '',
        message: `Rejected promise in ${timeout + 'ms'}`,
        color: '#ef4040',
        messageColor: '#fff',
      });
    }, timeout);
  }
  form.reset();
};
btn.addEventListener('click', clickHandler);
