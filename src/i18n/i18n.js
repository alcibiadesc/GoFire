import {writable, derived} from 'svelte/store';
import translations from './translations';

export const dict = writable();

dict.set(translations);

const getLocalLanguage = () => {
  const language = navigator.language || navigator.userLanguage;
  const languageParts = language.split('-');
  const languages = Object.keys(translations);
  const checkLangExist = languages.find((lang) => lang == languageParts[0]);
  return checkLangExist ? languageParts[0] : 'en';
};

const STORE_PREFIX = 'language';
const languageItem = localStorage.getItem(STORE_PREFIX);


export const locale = writable(
    JSON.parse(languageItem) ||
    getLocalLanguage());

locale.subscribe((value) => {
  if (languageItem !== value) {
    localStorage.setItem(STORE_PREFIX, JSON.stringify(value));
  }
});
const localizedDict = derived([dict, locale], ([$dict, $locale]) => {
  if (!$dict || !$locale) return;
  return ($dict[$locale]);
});


const getMessageFromLocalizedDict = (id, localizedDict) => {
  const splitId = id.split('.');
  let message = {...localizedDict};
  splitId.forEach((partialId) => {
    message = message[partialId];
  });

  const defaultEng = () => {
    message = {...translations.en};
    splitId.forEach((partialId) => {
      message = message[partialId];
    });
    return message;
  };

  return message !== undefined ? message : defaultEng();
};

const createMessageFormatter = (localizedDict) =>
  (id) => getMessageFromLocalizedDict(id, localizedDict);

export const t = derived(localizedDict, ($localizedDict) => {
  return (createMessageFormatter($localizedDict));
});

export const currencyStore = writable('USD');
