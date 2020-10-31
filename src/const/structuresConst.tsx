import { Placeholder } from "./groupConst";

export enum structuresConst {
  groups = "GROUPS",
  playOffs = "PLAY_OFFS",
}

export let structuresConstString = new Map();
structuresConstString.set(structuresConst.groups, "Groups");
structuresConstString.set(structuresConst.playOffs, "Play offs");

export enum constraintsConst {
  maxLastRounds = 32,
}

export enum roundsStringConst {
  final = "Finał",
  semiFinal = "Półfinał",
  quarterFinal = "Ćwierćfinał",
  sixteen = "1/16 finału",
  thirtyTwo = "1/32 finału",
  sixtyFour = "1/64 finału",
}

export let placeMatchesTitle = new Map();
placeMatchesTitle.set(1, "Finał");
placeMatchesTitle.set(3, "o 3 miejsce");

export let roundMatchesTitle = new Map();
roundMatchesTitle.set(1, roundsStringConst.final);
roundMatchesTitle.set(2, roundsStringConst.semiFinal);
roundMatchesTitle.set(4, roundsStringConst.quarterFinal);
roundMatchesTitle.set(8, roundsStringConst.sixteen);
roundMatchesTitle.set(16, roundsStringConst.thirtyTwo);
roundMatchesTitle.set(32, roundsStringConst.sixtyFour);

export type Result = {
  home: number;
  away: number;
};

export type TeamsPlaceholder = {
  home?: Placeholder;
  away?: Placeholder;
};

export type Id = string;
