import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
let userSelectedDate;
const dateFlat = document.querySelector('#datetime-picker');
const button = document.querySelector('button');
button.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const dateNow = Date.now();
    if (selectedDates[0].getTime() > dateNow) {
      userSelectedDate = selectedDates[0].getTime();
      button.disabled = false;
    } else {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        progressBar: false,
        close: false,
        balloon: true,
      });
      //   window.alert('Please choose a date in the future');
    }
  },
};
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const foo1 = flatpickr(dateFlat, options);
foo1;
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
// const addLeadingZero = str1 => {
//   str1.padStart(2, "'`0`'");
// };
const clickHandler = event => {
  button.disabled = true;
  dateFlat.disabled = true;
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;
    const timeArray = convertMs(diff);
    function addLeadingZero(value) {
      return value.toString().padStart(2, '0');
    }
    days.textContent = addLeadingZero(timeArray.days);
    hours.textContent = addLeadingZero(timeArray.hours);
    minutes.textContent = addLeadingZero(timeArray.minutes);
    seconds.textContent = addLeadingZero(timeArray.seconds);
    if (diff < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
};
button.addEventListener('click', clickHandler);
