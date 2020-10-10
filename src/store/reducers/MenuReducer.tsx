import moment from "moment";
import { MenuActions } from "../actions/MenuActions";

const initState = {
  selectedDate: moment(),
  isDateActive: false,
  back: undefined,
};

const menuReducer = (state = initState, action: MenuActions) => {
  switch (action.type) {
    case "SELECTED_DATE_UPDATED":
      console.log("SELECTED_DATE_UPDATED");
      return {
        ...state,
        selectedDate: action.selectedDate,
      };
    case "ACTIVE_DATE_SET":
      console.log("ACTIVE_DATE_SET");
      return {
        ...state,
        isDateActive: action.isDateActive,
      };
    case "BACK_SET":
      console.log("BACK_SET");
      return {
        ...state,
        back: action.back,
      };
    default:
      return state;
  }
};

export default menuReducer;
