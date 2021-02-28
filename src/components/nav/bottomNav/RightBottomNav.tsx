import React from "react";
import { TabsStyled, TabStyled } from "../../../styled/styledTabs";

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
    <TabsStyled
      value={value}
      indicatorColor="secondary"
      textColor="secondary"
      onChange={handleChange}
    >
      <TabStyled label="My" />
      <TabStyled label="Favorite" />
    </TabsStyled>
  );
}
