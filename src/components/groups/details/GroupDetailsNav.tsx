import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import groupDetailsDict from "../../../locale/groupDetails.dict";
import { LOCALE } from "../../../locale/config";
import {
  TabRC,
  TabsContainer,
} from "../../../styled/styledComponents/navigation/styledTabs";
import {
  E_GROUP_MENU,
  useTournamentNav,
} from "../../../hooks/useTournamentNavs";

export default function GroupDetailsNav({
  locale,
  value,
  setValue,
}: {
  locale: LOCALE;
  value: E_GROUP_MENU;
  setValue: (value: E_GROUP_MENU) => void;
}) {
  const { setLocalStorageGroupNav } = useTournamentNav();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setLocalStorageGroupNav(newValue);
    setValue(newValue);
  };

  // TODO: Translate
  return (
    <Rosetta translations={groupDetailsDict} locale={locale}>
      <TabsContainer
        value={value}
        indicatorColor="secondary"
        textColor="secondary"
        handleChange={handleChange}
      >
        <TabRC label={<Translator id="table" />} />
        <TabRC label={<Translator id="matches" />} />
      </TabsContainer>
    </Rosetta>
  );
}
