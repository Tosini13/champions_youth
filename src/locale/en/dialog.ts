import { notifications } from "./notifications";
import { matchRound } from "./tournamentDetails";

export const dialog = {
  chooseTeams: "Choose Teams",
  chooseStructure: "Choose Structure",
  addTeam: "Add Team",
  matches: "Matches",
  settings: "Settings",
  doCreateGroups: "Do you want to create groups?",
  groupsStructure: "Groups",
  bracketStructure: "Bracket",
  chooseLanguage: "Choose Language",
  ...matchRound,
  ...notifications,
};
