import { LOCALE } from "../../locale/config";
import { DictionaryActions } from "../actions/DictionaryActions";

const initState = {
  locale: LOCALE.english,
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
