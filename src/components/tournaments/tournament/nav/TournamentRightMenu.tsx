import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import { Tabs } from "@material-ui/core";
import menuDict from "../../../../locale/menu";
import { LOCALE } from "../../../../locale/config";
import { TabRC } from "../../../../styled/styledComponents/navigation/styledTabs";

export enum TOURNAMENT_RIGHT_MENU {
  "GROUPS" = 0,
  "PLAY_OFFS" = 1,
}

export default function TournamentRightMenu({
  locale,
  value,
  setValue,
}: {
  locale: LOCALE;
  value: TOURNAMENT_RIGHT_MENU;
  setValue: (value: TOURNAMENT_RIGHT_MENU) => void;
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
        <TabRC label={<Translator id={"groups"} />} />
        <TabRC label={<Translator id={"playOffs"} />} />
      </Tabs>
    </Rosetta>
  );
}
