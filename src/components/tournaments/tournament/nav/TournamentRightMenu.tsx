import React from "react";
import { TabsStyled, TabStyled } from "../../../../styled/styledTabs";

export enum TOURNAMENT_RIGHT_MENU {
  "GROUPS" = 0,
  "PLAY_OFFS" = 1,
}

export default function TournamentRightMenu({
  value,
  setValue,
}: {
  value: TOURNAMENT_RIGHT_MENU;
  setValue: (value: TOURNAMENT_RIGHT_MENU) => void;
}) {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <TabsStyled
      value={value}
      indicatorColor="secondary"
      textColor="secondary"
      onChange={handleChange}
    >
      <TabStyled label="Groups" />
      <TabStyled label="Play Offs" />
    </TabsStyled>
  );
}
