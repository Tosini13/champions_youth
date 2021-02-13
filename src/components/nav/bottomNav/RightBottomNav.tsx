import React from "react";
import Tabs from "@material-ui/core/Tabs";
import { BotomNavTabStyled } from "./LeftBottomNav";

export enum RIGHT_VIEW {
  "MY" = 0,
  "FAVORITE" = 1,
}

export default function RightBottomNav({
  value,
  setValue,
}: {
  value: number;
  setValue: (value: number) => void;
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
      <BotomNavTabStyled label="My" />
      <BotomNavTabStyled label="Favorite" />
    </Tabs>
  );
}
