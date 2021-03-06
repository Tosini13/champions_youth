import React from "react";
import { TabStyled } from "../../../../styled/styledTabs";
import { Tabs } from "@material-ui/core";

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
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      indicatorColor="secondary"
      textColor="secondary"
      onChange={handleChange}
    >
      <TabStyled label="Info" />
      <TabStyled label="Teams" />
    </Tabs>
  );
}
