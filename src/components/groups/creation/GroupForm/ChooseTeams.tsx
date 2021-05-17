import React from "react";
import styled from "styled-components";
import { Rosetta } from "react-rosetta";

import chooseTeamDict from "../../../../locale/chooseTeam.dict";
import { TeamData } from "../../../../models/teamData";
import { Id } from "../../../../const/structuresConst";
import { TeamListStyled } from "../../../../styled/styledTeams";
import ChooseTeamsElement from "./ChooseTeamsElement";
import { GroupModel } from "../../../../NewModels/Group";
import { ScrollBarStyled } from "../../../../styled/styledScrollBar";
import { DialogRU } from "../../../../styled/styledComponents/navigation/styledDialog";
import { useLocale } from "../../../../Provider/LocaleProvider";

const TeamList = styled(TeamListStyled)`
  overflow-x: hidden;
  flex-wrap: nowrap;
  ${ScrollBarStyled}
`;

export interface ChooseTeamsProps {
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
  const { locale } = useLocale();
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
      <DialogRU onClose={handleClose} open={open} title={"chooseTeams"}>
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

export default ChooseTeams;
