import { isAfter } from "date-fns";
import moment, { Moment } from "moment";
import { GroupModel } from "../NewModels/Group";

export const calculateGroupsFinishDate = (groups: GroupModel[]) => {
  return moment(
    groups
      .map((group) => group.finishAt)
      .reduce((prev?: Moment, current?: Moment) => {
        if (current && !prev) {
          return current;
        }
        if (!current || !prev) {
          return undefined;
        }
        return isAfter(
          new Date(moment(current).format()),
          new Date(moment(prev).format())
        )
          ? current
          : prev;
      }, undefined)
  ).format();
};
