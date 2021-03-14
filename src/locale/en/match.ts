import { matchRound } from "./tournamentDetails";

export const match = {
  final: "Final",
  semiFinal: "Semi-final",
  quarterFinal: "Quarter-final",
  sixteen: "1/16 finals",
  thirtyTwo: "1/32 finals",
  sixtyFour: "1/64 finals",
  finals: "finals",
  round: "Round",
  winner: "Winner",
  loser: "Loser",
  noTeam: "No Team",
  place: "place",
  ...matchRound,
};
