import moment from "moment";
import { MenuActions } from "../actions/MenuActions";

const initState = {
  selectedDate: moment(),
};

const menuReducer = (state = initState, action: MenuActions) => {
  switch (action.type) {
    case "SELECTED_DATE_UPDATED":
      console.log("SELECTED_DATE_UPDATED");
      return {
        ...state,
        selectedDate: action.selectedDate,
      };
    default:
      return state;
  }
};

export default menuReducer;
