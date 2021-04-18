export const teams = {
  arsenal: "Arsenal London",
  chelsea: "Chelsea",
  milano: "Milano",
  psg: "Paris Saint Germain",
  borussia: "Borussia",
  inter: "Inter",
  manC: "Man City",
  tottenham: "Tottenham",
  bayern: "Bayern",
  barca: "F.C. Barcelona",
  manU: "ManU",
  juve: "Juve",
  liverpool: "Liverpool",
  pogon: "Pogoń",
};

export const groups = [
  {
    name: "North Group",
    teams: [teams.arsenal, teams.chelsea, teams.milano, teams.psg],
  },
  {
    name: "South Group",
    teams: [teams.borussia, teams.inter, teams.manC, teams.tottenham],
  },
  {
    name: "West Group",
    teams: [teams.bayern, teams.barca, teams.manU],
  },
  {
    name: "East Group",
    teams: [teams.juve, teams.liverpool, teams.pogon],
  },
];
