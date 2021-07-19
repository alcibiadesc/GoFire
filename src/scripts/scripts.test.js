import {format, formatBasic, formatPercent} from './scripts.js';

describe('Format Number', () => {
  test('format a number with €', () => {
    const result = formatBasic(1000);
    expect(result).toBe('$1,000.00');
  });

  test('format a number with € in a compact style', () => {
    const result = format(1000);
    expect(result).toBe('$1K');
  });

  test('format a number with € in a percent style', () => {
    const result = formatPercent(84.5);
    expect(result).toBe('8,450%');
  });

  test('format a number € with a string empty', () => {
    const result = format();
    expect(result).toBe('$0');
  });

  test('format basic a number with a string empty', () => {
    const result = formatBasic();
    expect(result).toBe('$0.00');
  });
  test('format percent a number with a string empty', () => {
    const result = formatPercent();
    expect(result).toBe('0%');
  });
});
