import {writable} from 'svelte/store';
import currencyDict from './currencyDict';

export const currency = writable('USD');

export let currencyProps = {
  code: 'USD',
  country: 'es-US',
};


export let formatNum = (num = 0, notation = 'compact') => {};

currency.subscribe((value) => {
  currencyProps = currencyDict[value];

  formatNum = (
      num = 0,
      notation = 'compact',
      {code, country} = currencyProps,
  ) => {
    return new Intl.NumberFormat(country, {
      notation,
      style: 'currency',
      currency: code,
    }).format(num);
  };
});


