import React from "react";
import styled from "styled-components";
import { Rosetta, Translator } from "react-rosetta";

import { Grid, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import chooseTeamDict from "../../../../locale/chooseTeam.dict";
import { LOCALE } from "../../../../locale/config";
import { connect } from "react-redux";
import { TeamData } from "../../../../models/teamData";
import { Id } from "../../../../const/structuresConst";
import { TeamListStyled } from "../../../../styled/styledTeams";
import ChooseTeamsElement from "./ChooseTeamsElement";
import { DialogStyled } from "../../../../styled/styledLayout";
import { GroupModel } from "../../../../NewModels/Group";
import { ScrollBarStyled } from "../../../../styled/styledScrollBar";

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

  console.log(locale);

  return (
    <Rosetta translations={chooseTeamDict} locale={locale}>
      <DialogStyled onClose={handleClose} open={open}>
        <Grid container justify="space-between" alignItems="center" spacing={5}>
          <Grid item>
            <Typography variant="h6">
              <Translator id="chooseTeams" />
            </Typography>
          </Grid>
          <Grid item>
            <IconButton color="secondary" size="small" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
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
      </DialogStyled>
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
