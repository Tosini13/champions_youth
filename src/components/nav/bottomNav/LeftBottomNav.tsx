import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { Tabs } from "@material-ui/core";
import { TabStyled } from "../../../styled/styledTabs";
import { LOCALE } from "../../../locale/config";
import menuDict from "../../../locale/menu";
import { bottomMenuConst } from "../../../const/menuConst";

export enum LEFT_VIEW {
  "TOURNAMENTS" = 0,
  "LIVE" = 1,
}

export default function LeftBottomNav({
  locale,
  value,
  setValue,
}: {
  locale: LOCALE;
  value: number;
  setValue: (value: number) => void;
}) {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Rosetta translations={menuDict} locale={locale}>
      <Tabs
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        onChange={handleChange}
      >
        <TabStyled label={<Translator id={bottomMenuConst.tournaments} />} />
        <TabStyled label={<Translator id={bottomMenuConst.live} />} />
      </Tabs>
    </Rosetta>
  );
}
