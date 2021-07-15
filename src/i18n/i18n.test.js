import {get} from 'svelte/store';
import {locale} from './i18n';

describe('i18n', () => {
  test(' i18n.locale should be english', () => {
    const result = get(locale);
    const expected = 'en';
    expect(result).toBe(expected);
  });
  test('i18n.locale can change to spanish', () => {
    locale.set('es');
    const result = get(locale);
    const expected = 'es';
    expect(result).toBe(expected);
  },
  );
});
