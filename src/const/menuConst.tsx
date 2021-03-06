import { Id } from "./structuresConst";

export enum menuPlayOffsConst {
  bracket = "BRACKET",
  round = "ROUND",
}

export enum menuTournamentConst {
  info = "INFO",
  groups = "GROUPS",
  playoffs = "PLAYOFFS",
  teams = "TEAMS",
}

export enum menuSideBarConst {
  create = "CREATE",
  login = "LOGIN",
  logout = "LOGOUT",
  signUp = "SIGNUP",
}

export enum bottomMenuConst {
  tournaments = "tournaments",
  matches = "matches",
  my = "my",
  favorites = "favorites",
}

export enum routerConstString {
  create = "/create",
  edit = "/edit/:tournamentId",
  login = "/login",
  logout = "/logout",
  signUp = "/signup",
  tournaments = "/",
  tournament = "/tournament",
  createGroups = "/tournament/:tournamentId/groups/add",
  createPlayOffsGroups = "/tournament/:tournamentId/playOffs/groups/add",
  group = "/tournament/:tournamentId/groups/:groupId",
  playOffsGroup = "/tournament/:tournamentId/playOffs/groups/:groupId",
  bracket = "/tournament/:tournamentId/playOffs/games/:gameId",
  matchPlayOffsGroup = "/tournament/:tournamentId/playOffs/groups/:groupId/matches/:matchId",
  matchGroup = "/tournament/:tournamentId/groups/:groupId/matches/:matchId",
  matchPlayOffs = "/tournament/:tournamentId/games/:gameId/matches/:matchId",
  matches = "/?view=matches",
  my = "/?view=my",
  favorites = `/?view=favorites`,
}

export const routerGenerateConst = {
  tournament: (tournamentId: Id) => {
    return `/tournament/${tournamentId}`;
  },
  editTournament: (tournamentId: Id) => {
    return `/edit/${tournamentId}`;
  },
  createGroups: (tournamentId: Id) => {
    return `/tournament/${tournamentId}/groups/add`;
  },
  createPlayOffsGroups: (tournamentId: Id) => {
    return `/tournament/${tournamentId}/playOffs/groups/add`;
  },
  groups: (tournamentId: Id, groupId: Id) => {
    return `/tournament/${tournamentId}/groups/${groupId}`;
  },

  playOffsGroup: (tournamentId: Id, groupId: Id) => {
    return `/tournament/${tournamentId}/playOffs/groups/${groupId}`;
  },

  bracket: (tournamentId: Id, gameId: Id) => {
    return `/tournament/${tournamentId}/playOffs/games/${gameId}`;
  },

  matchGroup: (groupId: Id, matchId: Id) => {
    return `${groupId}/matches/${matchId}`;
  },

  directMatchGroup: (tournamentId: Id, groupId: Id, matchId: Id) => {
    return `/tournament/${tournamentId}/groups/${groupId}/matches/${matchId}`;
  },

  directMatchPlayOffsGroup: (tournamentId: Id, groupId: Id, matchId: Id) => {
    return `/tournament/${tournamentId}/playOffs/groups/${groupId}/matches/${matchId}`;
  },

  matchPlayOffs: (tournamentId: Id, gameId: Id, matchId: Id) => {
    return `/tournament/${tournamentId}/games/${gameId}/matches/${matchId}`;
  },
};

export let bottomMenuTitleConst = new Map();
bottomMenuTitleConst.set(bottomMenuConst.tournaments, "Turnieje");
bottomMenuTitleConst.set(bottomMenuConst.matches, "Na żywo");
bottomMenuTitleConst.set(bottomMenuConst.my, "Moje");
bottomMenuTitleConst.set(bottomMenuConst.favorites, "Ulubione");

export let routerConst = new Map();
routerConst.set(routerConstString.create, menuSideBarConst.create);
routerConst.set(routerConstString.login, menuSideBarConst.login);
routerConst.set(routerConstString.logout, menuSideBarConst.logout);
routerConst.set(routerConstString.signUp, menuSideBarConst.signUp);
routerConst.set(routerConstString.tournaments, bottomMenuConst.tournaments);
routerConst.set(routerConstString.matches, bottomMenuConst.matches);
routerConst.set(routerConstString.my, bottomMenuConst.my);
routerConst.set(routerConstString.favorites, bottomMenuConst.favorites);

export const DATE_FORMAT_DATA = "YYYY-MM-DDTHH:mm:SS";
export const DATE_FORMAT_SHOW = "DD-MM-YYYY";
export const DATE_FORMAT_CONVERTED = "YYYY-MM-DD HH:mm:SS";

class RouteConst {
  group = (tournamentId: Id, groupId: Id) => {
    return `/tournament/${tournamentId}/groups/${groupId}`;
  };

  tournament = (tournamentId: Id) => {
    return `/tournament/${tournamentId}`;
  };
}

export const routeConst = new RouteConst();
