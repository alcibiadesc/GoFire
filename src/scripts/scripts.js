import {currencyStore} from './../i18n/i18n.js';
import currencyDict from './../i18n/currencyDict.js';

let currency = 'USD';
let country = 'en-US';
currencyStore.subscribe((curr) => {
  currency = curr;
  country = currencyDict[curr].country;
});

export const format = (num = 0) => {
  return new Intl.NumberFormat(country, {
    notation: 'compact',
    style: 'currency',
    currency,
  }).format(num);
};

export const formatBasic = (num = 0) => {
  return new Intl.NumberFormat(country, {
    style: 'currency',
    currency,
  }).format(num);
};

export const formatPercent = (num = 0) => {
  return new Intl.NumberFormat('es', {
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
