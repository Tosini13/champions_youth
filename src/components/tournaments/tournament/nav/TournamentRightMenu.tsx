import React from "react";
import Tabs from "@material-ui/core/Tabs";
import { BotomNavTabStyled } from "../../../nav/bottomNav/LeftBottomNav";

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
    <Tabs
      value={value}
      indicatorColor="secondary"
      textColor="secondary"
      onChange={handleChange}
    >
      <BotomNavTabStyled label="Groups" />
      <BotomNavTabStyled label="Play Offs" />
    </Tabs>
  );
}
