import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { Tabs } from "@material-ui/core";
import { TabStyled } from "../../../styled/styledTabs";
import { LOCALE } from "../../../locale/config";
import menuDict from "../../../locale/menu";
import { bottomMenuConst } from "../../../const/menuConst";

export enum RIGHT_VIEW {
  "MY" = 0,
  "FAVORITE" = 1,
}

export default function RightBottomNav({
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
        <TabStyled label={<Translator id={bottomMenuConst.my} />} />
        <TabStyled label={<Translator id={bottomMenuConst.favorites} />} />
      </Tabs>
    </Rosetta>
  );
}
