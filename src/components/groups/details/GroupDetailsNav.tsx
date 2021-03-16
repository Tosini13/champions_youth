import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import { Tabs } from "@material-ui/core";
import { TabStyled } from "../../../styled/styledTabs";
import groupDetailsDict from "../../../locale/groupDetails.dict";
import { LOCALE } from "../../../locale/config";

export enum E_GROUP_DETAILS_NAV {
  "TABLE" = 0,
  "MATCHES" = 1,
}

export default function GroupDetailsNav({
  locale,
  value,
  setValue,
}: {
  locale: LOCALE;
  value: E_GROUP_DETAILS_NAV;
  setValue: (value: E_GROUP_DETAILS_NAV) => void;
}) {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // TODO: Translate
  return (
    <Rosetta translations={groupDetailsDict} locale={locale}>
      <Tabs
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleChange}
      >
        <TabStyled label={<Translator id="table" />} />
        <TabStyled label={<Translator id="matches" />} />
      </Tabs>
    </Rosetta>
  );
}
