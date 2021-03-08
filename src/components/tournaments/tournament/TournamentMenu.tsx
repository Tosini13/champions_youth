import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { menuTournamentConst } from "../../../const/menuConst";
import {
  TournamentDashboardMenuItemStyled,
  TournamentDashboardMenuStyled,
} from "../../../styled/styledTournament";
import { connect } from "react-redux";
import { LOCALE } from "../../../locale/config";

type Props = {
  view: menuTournamentConst;
  setView: (view: menuTournamentConst) => void;
  locale: LOCALE;
};

const TournamentMenu: React.FC<Props> = ({ view, setView, locale }) => {
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

const mapStateToProps = (state: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(TournamentMenu);
