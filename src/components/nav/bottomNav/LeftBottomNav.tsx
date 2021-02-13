import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import styled from "styled-components";

export const BotomNavTabStyled = styled(Tab)`
  flex-grow: 1;
  max-width: none;
`;

export enum LEFT_VIEW {
  "TOURNAMENTS" = 0,
  "LIVE" = 1,
}

export default function LeftBottomNav({
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
      <BotomNavTabStyled label="Tournaments" />
      <BotomNavTabStyled label="Live" />
    </Tabs>
  );
}
