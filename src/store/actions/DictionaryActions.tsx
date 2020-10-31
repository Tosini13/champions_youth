export interface DictionaryActions {
  type: string;
  locale?: string;
}

export const setLocale = (locale: string) => {
  return {
    type: "LANGUAGE_SET",
    locale,
  };
};
