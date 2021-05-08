import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import menuDict from "../../../../locale/menu";
import { LOCALE } from "../../../../locale/config";
import {
  TabRC,
  TabsContainer,
} from "../../../../styled/styledComponents/navigation/styledTabs";

export enum TOURNAMENT_LEFT_MENU {
  "INFO" = 0,
  "TEAMS" = 1,
}

export default function TournamentLeftMenu({
  locale,
  value,
  setValue,
}: {
  locale: LOCALE;
  value: TOURNAMENT_LEFT_MENU;
  setValue: (value: TOURNAMENT_LEFT_MENU) => void;
}) {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Rosetta translations={menuDict} locale={locale}>
      <TabsContainer
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        handleChange={handleChange}
      >
        <TabRC label={<Translator id={"info"} />} />
        <TabRC label={<Translator id={"teams"} />} />
      </TabsContainer>
    </Rosetta>
  );
}
