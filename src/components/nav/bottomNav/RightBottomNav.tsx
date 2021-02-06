import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { BotomNavTabStyled } from "./LeftBottomNav";

export default function RightBottomNav() {
  const [value, setValue] = React.useState(0);

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
