import React from "react";

import { LOCALE } from "../../../../locale/config";

import { Rosetta, Translator } from "react-rosetta";

import menuDict from "../../../../locale/menu";
import {
  TabRC,
  TabsContainer,
} from "../../../../styled/styledComponents/navigation/styledTabs";
import {
  E_TOURNAMENT_MENU,
  useTournamentNav,
} from "../../../../hooks/useTournamentNavs";

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
        <TabRC label={<Translator id={"info"} />} />
        <TabRC label={<Translator id={"teams"} />} />
        <TabRC label={<Translator id={"groups"} />} />
        <TabRC label={<Translator id={"playOffs"} />} />
      </TabsContainer>
    </Rosetta>
  );
}
