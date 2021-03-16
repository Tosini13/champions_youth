import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { Tabs } from "@material-ui/core";
import { TabStyled } from "../../../../styled/styledTabs";
import menuDict from "../../../../locale/menu";
import { LOCALE } from "../../../../locale/config";

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
      <Tabs
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleChange}
      >
        <TabStyled label={<Translator id={"info"} />} />
        <TabStyled label={<Translator id={"teams"} />} />
      </Tabs>
    </Rosetta>
  );
}
