import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import tournamentMenuDict from "../../../locale/tournamentMenu";
import { menuTournamentConst } from "../../../const/menuConst";
import {
  TournamentDashboardMenuItemStyled,
  TournamentDashboardMenuStyled,
} from "../../../styled/styledTournament";
import { connect } from "react-redux";

type Props = {
  view: menuTournamentConst;
  setView: (view: menuTournamentConst) => void;
  locale: string;
};

const TournamentMenu: React.FC<Props> = ({
  view,
  setView,
  locale,
  children,
}) => {
  console.log(locale);
  return (
    <Rosetta translations={tournamentMenuDict} locale={locale}>
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
