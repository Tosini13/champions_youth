import React from "react";
import styled from "styled-components";
import { Rosetta, Translator } from "react-rosetta";

import { Grid, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import chooseTeamDict from "../../../../locale/chooseTeam.dict";
import { LOCALE } from "../../../../locale/config";
import { connect } from "react-redux";
import { Id } from "../../../../const/structuresConst";
import { TeamListStyled } from "../../../../styled/styledTeams";
import ChooseTeamsElement from "./ChooseTeamsElement";
import { DialogStyled } from "../../../../styled/styledLayout";
import { GroupModel } from "../../../../NewModels/Group";
import { NewPlaceholder } from "../../../../NewModels/Team";
import { PromotedGroup } from "./CreatePlayOffsGroupPage";
import { ScrollBarStyled } from "../../../../styled/styledScrollBar";

const TeamList = styled(TeamListStyled)`
  overflow-x: hidden;
  flex-wrap: nowrap;
  ${ScrollBarStyled}
`;

export interface ChooseTeamsProps {
  locale: LOCALE;
  userId: Id;
  promotedGroups: PromotedGroup[];
  chosenGroup?: GroupModel;
  chosenTeams: NewPlaceholder[];
  open: boolean;
  setChosenTeams: (placeholderTeams: NewPlaceholder[]) => void;
  handleOpenTeams: (group?: GroupModel) => void;
  handleChooseGroupTeam: (selected: NewPlaceholder) => void;
}

const ChooseTeams: React.FC<ChooseTeamsProps> = ({
  locale,
  userId,
  promotedGroups,
  chosenGroup,
  chosenTeams,
  open,
  setChosenTeams,
  handleOpenTeams,
  handleChooseGroupTeam,
}) => {
  const handleChooseTeam = (selected: NewPlaceholder) => {
    if (chosenTeams.includes(selected)) {
      const selectedTeams = chosenTeams.filter(
        (team) => team.id !== selected?.id || team.place !== selected?.place
      );
      setChosenTeams(selectedTeams);
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
        {promotedGroups.map((group) => (
          <div key={group.id}>
            <p>{group.name}</p>
            <TeamList>
              {group.teams?.map((team: NewPlaceholder) => (
                <ChooseTeamsElement
                  key={team.place}
                  team={team}
                  userId={userId}
                  handleChooseTeam={handleChooseTeam}
                  selected={chosenTeams.includes(team)}
                  restricted={Boolean(
                    chosenTeams.includes(team) &&
                      !chosenGroup?.placeholderTeams?.includes(team)
                  )}
                />
              ))}
            </TeamList>
          </div>
        ))}
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
