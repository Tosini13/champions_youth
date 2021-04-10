import React from "react";
import styled from "styled-components";
import { Rosetta } from "react-rosetta";

import chooseTeamDict from "../../../../locale/chooseTeam.dict";
import { LOCALE } from "../../../../locale/config";
import { connect } from "react-redux";
import { TeamData } from "../../../../models/teamData";
import { Id } from "../../../../const/structuresConst";
import { TeamListStyled } from "../../../../styled/styledTeams";
import ChooseTeamsElement from "./ChooseTeamsElement";
import { GroupModel } from "../../../../NewModels/Group";
import { ScrollBarStyled } from "../../../../styled/styledScrollBar";
import { DialogRU } from "../../../../styled/styledDialog";

const TeamList = styled(TeamListStyled)`
  overflow-x: hidden;
  flex-wrap: nowrap;
  ${ScrollBarStyled}
`;

export interface ChooseTeamsProps {
  locale: LOCALE;
  userId: Id;
  tournamentId: Id;
  teams?: TeamData[];
  chosenGroup?: GroupModel;
  chosenTeams: TeamData[];
  open: boolean;
  setChosenTeams: (teams: TeamData[]) => void;
  handleOpenTeams: (group?: GroupModel) => void;
  handleChooseGroupTeam: (selected: TeamData) => void;
}

const ChooseTeams: React.FC<ChooseTeamsProps> = ({
  locale,
  userId,
  tournamentId,
  teams,
  chosenGroup,
  chosenTeams,
  open,
  setChosenTeams,
  handleOpenTeams,
  handleChooseGroupTeam,
}) => {
  const handleChooseTeam = (selected: TeamData) => {
    if (chosenTeams.includes(selected)) {
      setChosenTeams(chosenTeams.filter((team) => team.id !== selected.id));
    } else {
      setChosenTeams([...chosenTeams, selected]);
    }
    handleChooseGroupTeam(selected);
  };

  const handleClose = () => {
    handleOpenTeams();
  };

  return (
    <Rosetta translations={chooseTeamDict} locale={locale}>
      <DialogRU
        onClose={handleClose}
        open={open}
        title={"chooseTeams"}
        locale={locale}
      >
        <TeamList>
          {teams?.map((team: TeamData) => (
            <ChooseTeamsElement
              tournamentId={tournamentId}
              key={team.id}
              team={team}
              userId={userId}
              handleChooseTeam={handleChooseTeam}
              selected={chosenTeams.includes(team)}
              restricted={Boolean(
                chosenTeams.includes(team) && !chosenGroup?.teams.includes(team)
              )}
            />
          ))}
        </TeamList>
      </DialogRU>
    </Rosetta>
  );
};

const mapStateToProps = (state: any) => {
  return {
    locale: state.dictionary.locale,
    userId: state.firebase.auth.uid,
  };
};

export default connect(mapStateToProps)(ChooseTeams);
