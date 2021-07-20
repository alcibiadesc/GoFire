import {currency} from './../i18n/currency.js';
import currencyDict from './../i18n/currencyDict.js';

let code = 'USD';
let country = 'en-US';
currency.subscribe((curr) => {
  code = curr;
  country = currencyDict[curr].country;
});


export const formatBasic = (num = 0) => {
  return new Intl.NumberFormat(country, {
    style: 'currency',
    currency: code,
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
