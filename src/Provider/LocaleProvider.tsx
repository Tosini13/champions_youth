import React, { useState } from "react";
import { LOCALE } from "../locale/config";

export const LocaleContext = React.createContext({
  currentLocale: LOCALE.english,
  setLocale: (locale: LOCALE) => {},
});

export const LocaleProvider: React.FC<{}> = ({ children }) => {
  const currentLocale =
    (localStorage.getItem("championsYouthLocale") as LOCALE) || LOCALE.english;

  const [localeName, _setLocaleName] = useState<LOCALE>(currentLocale);

  const setLocaleName = (locale: LOCALE) => {
    localStorage.setItem("championsYouthLocale", locale);
    _setLocaleName(locale);
  };

  const contextValue = {
    currentLocale: localeName as LOCALE,
    setLocale: setLocaleName,
  };

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;

export const useLocale = () => {
  const currentLocale =
    (localStorage.getItem("championsYouthLocale") as LOCALE) || LOCALE.english;
  return {
    locale: currentLocale,
  };
};
