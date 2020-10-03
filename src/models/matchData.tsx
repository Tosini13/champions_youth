import { matchModeConst } from "../const/matchConst";
import { Id, Result, TeamsPlaceholder } from "../const/structuresConst";

export interface GameData {
  id: Id;
  home: Id | null;
  away: Id | null;
  placeholder: TeamsPlaceholder;
  result: Result | null;
  round: string;
  mode: matchModeConst;
}
