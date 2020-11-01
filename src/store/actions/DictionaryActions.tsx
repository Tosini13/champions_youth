import { LOCALE } from "../../locale/config";

export interface DictionaryActions {
  type: string;
  locale?: LOCALE;
}

export const setLocale = (locale: LOCALE) => {
  return {
    type: "LANGUAGE_SET",
    locale,
  };
};
