import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { menuTournamentConst } from "../../../const/menuConst";
import {
  TournamentDashboardMenuItemStyled,
  TournamentDashboardMenuStyled,
} from "../../../styled/styledTournament";
import { useLocale } from "../../../Provider/LocaleProvider";

type Props = {
  view: menuTournamentConst;
  setView: (view: menuTournamentConst) => void;
};

const TournamentMenu: React.FC<Props> = ({ view, setView }) => {
  const { locale } = useLocale();
  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <TournamentDashboardMenuStyled>
        <TournamentDashboardMenuItemStyled
          onClick={() => {
            setView(menuTournamentConst.info);
          }}
          selected={view === menuTournamentConst.info}
        >
          <Translator id="info" />
        </TournamentDashboardMenuItemStyled>
        <TournamentDashboardMenuItemStyled
          onClick={() => {
            setView(menuTournamentConst.groups);
          }}
          selected={view === menuTournamentConst.groups}
        >
          <Translator id="groups" />
        </TournamentDashboardMenuItemStyled>
        <TournamentDashboardMenuItemStyled
          onClick={() => {
            setView(menuTournamentConst.playoffs);
          }}
          selected={view === menuTournamentConst.playoffs}
        >
          <Translator id="playOffs" />
        </TournamentDashboardMenuItemStyled>
        <TournamentDashboardMenuItemStyled
          onClick={() => {
            setView(menuTournamentConst.teams);
          }}
          selected={view === menuTournamentConst.teams}
        >
          <Translator id="teams" />
        </TournamentDashboardMenuItemStyled>
      </TournamentDashboardMenuStyled>
    </Rosetta>
  );
};

export default TournamentMenu;
