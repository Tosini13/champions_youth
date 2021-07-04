import { LOCALE } from "./config";
import { auth as en } from "./en/auth";
import { auth as pl } from "./pl/auth";

const authDict = {
  en: en,
  pl: pl,
};

export default authDict;

export const authDictLocale = (locale: LOCALE) => {
  return authDict[locale];
};
