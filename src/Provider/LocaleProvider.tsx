import { useDispatch, useSelector } from "react-redux";
import { LOCALE } from "../locale/config";
import { LOCAL_STORAGE_LOCALE } from "../store/reducers/DictionaryReducer";

type TState = {
  dictionary: {
    locale: LOCALE;
  };
};

export const useLocale = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: TState) => state);

  const handleChangeLocale = (locale: LOCALE) => {
    localStorage.setItem(LOCAL_STORAGE_LOCALE, locale);
    dispatch({
      type: "LANGUAGE_SET",
      locale,
    });
  };

  return {
    locale: selector.dictionary.locale,
    handleChangeLocale,
  };
};
