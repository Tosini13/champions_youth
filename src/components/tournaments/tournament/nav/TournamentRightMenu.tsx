import React from "react";
import { Rosetta, Translator } from "react-rosetta";
import menuDict from "../../../../locale/menu";
import {
  TabRC,
  TabsContainer,
} from "../../../../styled/styledComponents/navigation/styledTabs";
import { useLocale } from "../../../../Provider/LocaleProvider";

export enum TOURNAMENT_RIGHT_MENU {
  "GROUPS" = 0,
  "PLAY_OFFS" = 1,
}

export default function TournamentRightMenu({
  value,
  setValue,
}: {
  value: TOURNAMENT_RIGHT_MENU;
  setValue: (value: TOURNAMENT_RIGHT_MENU) => void;
}) {
  const { locale } = useLocale();
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
        <TabRC label={<Translator id={"groups"} />} />
        <TabRC label={<Translator id={"playOffs"} />} />
      </TabsContainer>
    </Rosetta>
  );
}
