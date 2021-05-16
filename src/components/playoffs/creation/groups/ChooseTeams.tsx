import React from "react";
import styled from "styled-components";
import { Rosetta } from "react-rosetta";

import chooseTeamDict from "../../../../locale/chooseTeam.dict";
import { connect } from "react-redux";
import { Id } from "../../../../const/structuresConst";
import { TeamListStyled } from "../../../../styled/styledTeams";
import ChooseTeamsElement from "./ChooseTeamsElement";
import { GroupModel } from "../../../../NewModels/Group";
import { NewPlaceholder } from "../../../../NewModels/Team";
import { PromotedGroup } from "./CreatePlayOffsGroupPage";
import { ScrollBarStyled } from "../../../../styled/styledScrollBar";
import { DialogRU } from "../../../../styled/styledComponents/navigation/styledDialog";
import { useLocale } from "../../../../Provider/LocaleProvider";

const TeamList = styled(TeamListStyled)`
  overflow-x: hidden;
  flex-wrap: nowrap;
  padding-bottom: 5px;
  ${ScrollBarStyled}
`;

export interface ChooseTeamsProps {
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
  userId,
  promotedGroups,
  chosenGroup,
  chosenTeams,
  open,
  setChosenTeams,
  handleOpenTeams,
  handleChooseGroupTeam,
}) => {
  const { locale } = useLocale();
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
      <DialogRU onClose={handleClose} open={open} title={"chooseTeams"}>
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
