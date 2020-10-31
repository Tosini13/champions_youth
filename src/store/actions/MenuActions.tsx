import { Moment } from "moment";
import { routerConstString } from "../../const/menuConst";

export interface MenuActions {
  type: string;
  selectedDate?: Moment;
  isDateActive?: boolean;
  back?: routerConstString;
  locale?: string;
}

export const setSelectedDate = (selectedDate: Moment) => {
  return {
    type: "SELECTED_DATE_UPDATED",
    selectedDate,
  };
};

export const setActiveDate = (isDateActive: boolean) => {
  return {
    type: "ACTIVE_DATE_SET",
    isDateActive,
  };
};

export const setBack = (back: routerConstString | undefined) => {
  return {
    type: "BACK_SET",
    back,
  };
};