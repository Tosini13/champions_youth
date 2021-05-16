import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import menuDict from "../../../../locale/menu";
import {
  TabRC,
  TabsContainer,
} from "../../../../styled/styledComponents/navigation/styledTabs";
import { useLocale } from "../../../../Provider/LocaleProvider";

export enum TOURNAMENT_LEFT_MENU {
  "INFO" = 0,
  "TEAMS" = 1,
}

export default function TournamentLeftMenu({
  value,
  setValue,
}: {
  value: TOURNAMENT_LEFT_MENU;
  setValue: (value: TOURNAMENT_LEFT_MENU) => void;
}) {
  const { locale } = useLocale();
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
