import React from "react";
import { TabsStyled, TabStyled } from "../../../styled/styledTabs";

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
    <TabsStyled
      value={value}
      indicatorColor="secondary"
      textColor="secondary"
      onChange={handleChange}
    >
      <TabStyled label="Tournaments" />
      <TabStyled label="Live" />
    </TabsStyled>
  );
}
