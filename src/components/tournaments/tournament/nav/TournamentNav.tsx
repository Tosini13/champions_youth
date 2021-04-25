import React from "react";

import { LOCALE } from "../../../../locale/config";

import { Rosetta, Translator } from "react-rosetta";

import { TabStyled } from "../../../../styled/styledTabs";
import menuDict from "../../../../locale/menu";
import { TabsContainer } from "../../../../styled/styledComponents/navigation/styledTabs";

export enum E_TOURNAMENT_MENU {
  "INFO" = 0,
  "TEAMS" = 1,
  "GROUPS" = 2,
  "PLAY_OFFS" = 3,
}

export const useTournamentNav = () => {
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
    getLocalStorageTournamentNav,
    setLocalStorageTournamentNav,
    clearLocalStorageTournamentNav,
  };
};

export default function TournamentNav({
  locale,
  value,
  setValue,
}: {
  locale: LOCALE;
  value: E_TOURNAMENT_MENU;
  setValue: (value: E_TOURNAMENT_MENU) => void;
}) {
  const { setLocalStorageTournamentNav } = useTournamentNav();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setLocalStorageTournamentNav(newValue);
    setValue(newValue);
  };

  return (
    <Rosetta translations={menuDict} locale={locale}>
      <TabsContainer
        value={value}
        textColor="secondary"
        handleChange={handleChange}
      >
        <TabStyled label={<Translator id={"info"} />} />
        <TabStyled label={<Translator id={"teams"} />} />
        <TabStyled label={<Translator id={"groups"} />} />
        <TabStyled label={<Translator id={"playOffs"} />} />
      </TabsContainer>
    </Rosetta>
  );
}
