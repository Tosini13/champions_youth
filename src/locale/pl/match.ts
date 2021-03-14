import { matchRound } from "./tournamentDetails";

export const match = {
  final: "Finał",
  semiFinal: "Półfinał",
  quarterFinal: "Ćwierćfinał",
  sixteen: "1/16 finału",
  thirtyTwo: "1/32 finału",
  sixtyFour: "1/64 finału",
  finals: "finału",
  round: "Runda",
  winner: "Zwycięzca",
  loser: "Przegrany",
  noTeam: "Brak Zespołu",
  place: "miejsce",
  ...matchRound,
};
