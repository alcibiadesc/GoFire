export const format = (num = 0) => {
  return new Intl.NumberFormat('es', {
    notation: 'compact',
    style: 'currency',
    currency: 'EUR',
  }).format(num);
};

export const formatBasic = (num = 0) => {
  return new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'EUR',
  }).format(num);
};

export const formatPercent = (num = 0) => {
  return new Intl.NumberFormat('en', {
    style: 'percent',
  }).format(num);
};

export const today = new Date().toISOString().slice(0, 10);

export const round = (num = 0, option = {returnZero: false}) => {
  if (option.returnZero === true) {
        num < 0 ? (num = 0) : num;
  }
  return Math.round(num * 100) / 100;
};
