import React from "react";
import { Tabs } from "@material-ui/core";
import { TabStyled } from "../../../styled/styledTabs";

export enum E_GROUP_DETAILS_NAV {
  "TABLE" = 0,
  "MATCHES" = 1,
}

export default function GroupDetailsNav({
  value,
  setValue,
}: {
  value: E_GROUP_DETAILS_NAV;
  setValue: (value: E_GROUP_DETAILS_NAV) => void;
}) {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // TODO: Translate
  return (
    <Tabs
      value={value}
      indicatorColor="secondary"
      textColor="secondary"
      onChange={handleChange}
    >
      <TabStyled label="Table" />
      <TabStyled label="Matches" />
    </Tabs>
  );
}
