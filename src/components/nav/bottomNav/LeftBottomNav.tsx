import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import menuDict from "../../../locale/menu";
import { bottomMenuConst } from "../../../const/menuConst";
import {
  E_TAB_PLACE,
  TabRC,
  TabsContainer,
} from "../../../styled/styledComponents/navigation/styledTabs";
import { useLocale } from "../../../Provider/LocaleProvider";

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
  const { locale } = useLocale();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Rosetta translations={menuDict} locale={locale}>
      <TabsContainer
        place={E_TAB_PLACE.TOP}
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        handleChange={handleChange}
      >
        <TabRC label={<Translator id={bottomMenuConst.tournaments} />} />
        {/* <TabRC label={<Translator id={bottomMenuConst.matches} />} /> */}
      </TabsContainer>
    </Rosetta>
  );
}
