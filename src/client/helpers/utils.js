export const parseDate = (date) => {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const y = date.getFullYear();

  return `${m.length >= 10 ? m : `0${m}`}/${d}/${y}`;
};

const splitStr = (str) => {
  if (str.length === 0) {
    return [];
  }

  const arr = splitStr(str.substring(0, str.length - 3));
  arr.push(str.substring(str.length - 3));

  return arr;
};

export const displayMoney = (n) => {
  const a = splitStr(n.toString());

  return a.join(', ');
};
