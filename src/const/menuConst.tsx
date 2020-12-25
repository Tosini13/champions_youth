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
  tournaments = "TOURNAMENTS",
  live = "LIVE",
  my = "MY",
  favorites = "FAVORITES",
}

export enum routerConstString {
  create = "/create",
  login = "/login",
  logout = "/logout",
  signUp = "/signup",
  tournaments = "/",
  tournament = "/tournament",
  createGroups = "/tournament/:tournamentId/groups/add",
  group = "/tournament/:tournamentId/groups/:groupId",
  bracket = "/tournament/:tournamentId/playOffs/games/:gameId",
  matchGroup = "/tournament/:tournamentId/groups/:groupId/matches/:matchId",
  matchPlayOffs = "/tournament/:tournamentId/game/:gameId/matches/:matchId",
  live = "/live",
  my = "/my",
  favorites = "/favorites",
}

export const routerGenerateConst = {
  tournament: (tournamentId: Id) => {
    return `/tournament/${tournamentId}`;
  },
  createGroups: (tournamentId: Id) => {
    return `/tournament/${tournamentId}/groups/add`;
  },

  groups: (tournamentId: Id, groupId: Id) => {
    return `/tournament/${tournamentId}/groups/${groupId}`;
  },

  bracket: (tournamentId: Id, gameId: Id) => {
    return `/tournament/${tournamentId}/playOffs/games/${gameId}`;
  },

  matchGroup: (tournamentId: Id, groupId: Id, matchId: Id) => {
    return `/tournament/${tournamentId}/groups/${groupId}/matches/${matchId}`;
  },

  matchPlayOffs: (tournamentId: Id, gameId: Id, matchId: Id) => {
    return `/tournament/${tournamentId}/game/${gameId}/matches/${matchId}`;
  },
};

export let bottomMenuTitleConst = new Map();
bottomMenuTitleConst.set(bottomMenuConst.tournaments, "Turnieje");
bottomMenuTitleConst.set(bottomMenuConst.live, "Na żywo");
bottomMenuTitleConst.set(bottomMenuConst.my, "Moje");
bottomMenuTitleConst.set(bottomMenuConst.favorites, "Ulubione");

export let routerConst = new Map();
routerConst.set(routerConstString.create, menuSideBarConst.create);
routerConst.set(routerConstString.login, menuSideBarConst.login);
routerConst.set(routerConstString.logout, menuSideBarConst.logout);
routerConst.set(routerConstString.signUp, menuSideBarConst.signUp);
routerConst.set(routerConstString.tournaments, bottomMenuConst.tournaments);
routerConst.set(routerConstString.live, bottomMenuConst.live);
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
