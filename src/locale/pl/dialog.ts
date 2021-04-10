import { matchRound } from "./tournamentDetails";
import { notifications } from "./notifications";

export const dialog = {
  chooseTeams: "Wybierz Zespoły",
  chooseStructure: "Wybierz Strukturę",
  addTeam: "Dodaj Zespół",
  matches: "Mecze",
  settings: "Ustawienia",
  doCreateGroups: "Czy chcesz stworzyć grupy?",
  groupsStructure: "Grupy",
  bracketStructure: "Drabinka",
  chooseLanguage: "Wybierz Język",
  ...matchRound,
  ...notifications,
};
