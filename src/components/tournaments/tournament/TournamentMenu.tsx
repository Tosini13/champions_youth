import React from "react";

import { menuTournamentConst } from "../../../const/menuConst";
import {
  TournamentDashboardMenuItemStyled,
  TournamentDashboardMenuStyled,
} from "../../../styled/styledTournament";

type Props = {
  view: menuTournamentConst;
  setView: (view: menuTournamentConst) => void;
};

const TournamentMenu: React.FC<Props> = ({ view, setView, children }) => {
  return (
    <TournamentDashboardMenuStyled>
      <TournamentDashboardMenuItemStyled
        onClick={() => {
          setView(menuTournamentConst.info);
        }}
        selected={view === menuTournamentConst.info}
      >
        Info
      </TournamentDashboardMenuItemStyled>
      <TournamentDashboardMenuItemStyled
        onClick={() => {
          setView(menuTournamentConst.groups);
        }}
        selected={view === menuTournamentConst.groups}
      >
        Grupowa
      </TournamentDashboardMenuItemStyled>
      <TournamentDashboardMenuItemStyled
        onClick={() => {
          setView(menuTournamentConst.playoffs);
        }}
        selected={view === menuTournamentConst.playoffs}
      >
        Pucharowa
      </TournamentDashboardMenuItemStyled>
      <TournamentDashboardMenuItemStyled
        onClick={() => {
          setView(menuTournamentConst.teams);
        }}
        selected={view === menuTournamentConst.teams}
      >
        Zespoły
      </TournamentDashboardMenuItemStyled>
    </TournamentDashboardMenuStyled>
  );
};

export default TournamentMenu;
