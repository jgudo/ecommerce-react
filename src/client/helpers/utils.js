export const parseDate = (date) => {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const y = date.getFullYear();

  return `${m.length >= 10 ? m : `0${m}`}/${d}/${y}`;
};

export const displayMoney = (n) => {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  // or use toLocaleString()
  return format.format(n);
};

export const displayActionMessage = (msg) => {
  const div = document.createElement('div');
  const span = document.createElement('span');

  div.className = 'toast';
  span.className = 'toast-msg';

  span.textContent = msg;
  div.appendChild(span);

  document.body.appendChild(div);

  setTimeout(() => {
    document.body.removeChild(div);
  }, 3000);
};
