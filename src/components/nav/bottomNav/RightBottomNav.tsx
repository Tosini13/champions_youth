import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { LOCALE } from "../../../locale/config";
import menuDict from "../../../locale/menu";
import { bottomMenuConst } from "../../../const/menuConst";
import {
  TabRC,
  TabsContainer,
} from "../../../styled/styledComponents/navigation/styledTabs";

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
      <TabsContainer
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        handleChange={handleChange}
      >
        <TabRC label={<Translator id={bottomMenuConst.my} />} />
        <TabRC label={<Translator id={bottomMenuConst.favorites} />} />
      </TabsContainer>
    </Rosetta>
  );
}
