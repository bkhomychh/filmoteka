type Language = { [prop: string]: { [prop: string]: string } };

export const BASE_URL = 'https://api.themoviedb.org/3/';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';
export const API_KEY = '9e68854d69dbd1100bcb425bc2f51530';

export const LANGUAGE: Language = {
  EN: {
    original: 'English',
    short: 'en',
  },
  UK: {
    original: 'Українська',
    short: 'uk',
  },
  PL: {
    original: 'Polski',
    short: 'pl',
  },
};
