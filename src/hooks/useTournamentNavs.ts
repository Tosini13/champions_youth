export enum E_GROUP_MENU {
  "TABLE" = 0,
  "MATCHES" = 1,
}

export enum E_TOURNAMENT_MENU {
  "INFO" = 0,
  "TEAMS" = 1,
  "GROUPS" = 2,
  "PLAY_OFFS" = 3,
}

export const useTournamentNav = () => {
  const getLocalStorageGroupNav = () => {
    const value = Number(localStorage.getItem("GroupNav")) as E_GROUP_MENU;
    return value;
  };

  const setLocalStorageGroupNav = (value: E_GROUP_MENU) => {
    localStorage.setItem("GroupNav", value.toString());
  };

  const clearLocalStorageGroupNav = () => {
    localStorage.setItem("GroupNav", "");
  };

  const getLocalStorageTournamentNav = () => {
    const value = Number(
      localStorage.getItem("TournamentNav")
    ) as E_TOURNAMENT_MENU;
    return value;
  };

  const setLocalStorageTournamentNav = (value: E_TOURNAMENT_MENU) => {
    localStorage.setItem("TournamentNav", value.toString());
  };

  const clearLocalStorageTournamentNav = () => {
    localStorage.setItem("TournamentNav", "");
  };

  return {
    getLocalStorageGroupNav,
    setLocalStorageGroupNav,
    clearLocalStorageGroupNav,
    getLocalStorageTournamentNav,
    setLocalStorageTournamentNav,
    clearLocalStorageTournamentNav,
  };
};
