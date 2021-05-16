import { LOCALE } from "../../locale/config";
import { DictionaryActions } from "../actions/DictionaryActions";

export const LOCAL_STORAGE_LOCALE = "championsYouthLocale";
const initState = {
  locale:
    (localStorage.getItem(LOCAL_STORAGE_LOCALE) as LOCALE) || LOCALE.english,
};

const dictionaryReducer = (state = initState, action: DictionaryActions) => {
  switch (action.type) {
    case "LANGUAGE_SET":
      return {
        ...state,
        locale: action.locale,
      };
    default:
      return state;
  }
};

export default dictionaryReducer;
