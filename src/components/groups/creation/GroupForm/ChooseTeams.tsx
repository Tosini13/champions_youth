import React, { useState } from "react";
import { Rosetta, Translator } from "react-rosetta";

import DialogTitle from "@material-ui/core/DialogTitle";
import chooseTeamDict from "../../../../locale/chooseTeam.dict";
import { LOCALE } from "../../../../locale/config";
import { connect } from "react-redux";
import { TeamData } from "../../../../models/teamData";
import { Id } from "../../../../const/structuresConst";
import { TeamListStyled } from "../../../../styled/styledTeams";
import ChooseTeamsElement from "./ChooseTeamsElement";
import { DialogStyled } from "../../../../styled/styledLayout";
import { GroupCreationModel } from "../CreateGroupsScreen";

export interface ChooseTeamsProps {
  locale: LOCALE;
  userId: Id;
  teams?: TeamData[];
  chosenGroup?: GroupCreationModel;
  open: boolean;
  handleOpenTeams: (group?: GroupCreationModel) => void;
  handleChooseGroupTeam: (selected: TeamData) => void;
}

const ChooseTeams: React.FC<ChooseTeamsProps> = ({
  locale,
  userId,
  teams,
  chosenGroup,
  open,
  handleOpenTeams,
  handleChooseGroupTeam,
}) => {
  const [chosenTeams, setChosenTeams] = useState<TeamData[]>([]);

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
      <DialogStyled onClose={handleClose} open={open}>
        <DialogTitle>
          <Translator id="ChooseTeams" />
        </DialogTitle>
        <TeamListStyled>
          {teams?.map((team: TeamData) => (
            <ChooseTeamsElement
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
        </TeamListStyled>
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
