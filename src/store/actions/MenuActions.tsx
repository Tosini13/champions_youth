import { Moment } from "moment";

export interface MenuActions {
  type: string;
  selectedDate?: Moment;
}

export const setSelectedDate = (selectedDate: Moment) => {
  return {
    type: "SELECTED_DATE_UPDATED",
    selectedDate,
  };
};
