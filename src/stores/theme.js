import {writable} from 'svelte/store';

const STORE_PREFIX = 'theme';

const themeLocal = localStorage.getItem(`${STORE_PREFIX}`);

const systemTheme = () => {
  const checkDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return checkDark ? 'dark' : 'light';
};

const theme = writable(JSON.parse(themeLocal) || systemTheme());

theme.subscribe((value) => {
  if (themeLocal !== value) {
    localStorage.setItem(`${STORE_PREFIX}`, JSON.stringify(value));
  }
});

const dark = (root) => {
  root.setProperty('--background', '#2a2c31');
  root.setProperty('--primary', '#FFFFFF');
  root.setProperty('--secondary', '#e84c2b');
  root.setProperty('--tertiary', '#7e858d');
  root.setProperty('--background__input', '#656565');
  root.setProperty(
      '--filter',
      'invert(52%) sepia(73%) saturate(4792%) hue-rotate(343deg) brightness(92%) contrast(99%)',
  );
  root.setProperty(
      '--filter_primary',
      'invert(6%) sepia(10%) saturate(1293%) hue-rotate(178deg) brightness(101%) contrast(95%)',
  );
  root.setProperty(
      '--card__background',
      'linear-gradient(to bottom, #3b4044, #2f3138)',
  );
};

const light = (root) => {
  root.setProperty('--background', '#e1eaf9');
  root.setProperty('--primary', '#12151a');
  root.setProperty('--secondary', '#5573c2');
  root.setProperty('--tertiary', '#7d8ca2');
  root.setProperty('--background__input', '#eaf3fd');
  root.setProperty(
      '--filter',
      'invert(42%) sepia(43%) saturate(698%) hue-rotate(185deg) brightness(96%) contrast(87%)',
  );
  root.setProperty(
      '--filter_primary',
      'invert(100%) sepia(0%) saturate(1%) hue-rotate(281deg) brightness(103%) contrast(101%)',
  );
  root.setProperty(
      '--card__background',
      'linear-gradient(to bottom, #f0faff, #cdd9ec)',
  );
};

theme.subscribe((value) => {
  const root = document.documentElement.style;
	value === 'dark' ? dark(root) : light(root);
});

export {theme};
