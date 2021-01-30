import React from "react";

import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { Id } from "../../../../const/structuresConst";
import { TeamListElementStyled } from "../../../../styled/styledTeams";
import Logo, { SIZE_LOGO } from "../../../global/Logo";
import { IconButton } from "@material-ui/core";
import { ListItemTextStyled } from "../../../../styled/styledBracket";
import { NewPlaceholder } from "../../../../NewModels/Team";

type Props = {
  team: NewPlaceholder;
  userId: Id;
  selected: boolean;
  restricted: boolean;
  handleChooseTeam: (selected: NewPlaceholder) => void;
};

const ChooseTeamsElement: React.FC<Props> = ({
  team,
  userId,
  selected,
  restricted,
  handleChooseTeam,
}) => {
  return (
    <TeamListElementStyled
      button
      onClick={() => (restricted ? false : handleChooseTeam(team))}
    >
      <Logo size={SIZE_LOGO.sm} />
      <>
        <ListItemTextStyled
          primary={team.id + " " + team.place}
          style={{ marginLeft: "5px" }}
        />
        <ListItemSecondaryAction>
          <IconButton color={restricted ? "primary" : "secondary"}>
            {selected ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </ListItemSecondaryAction>
      </>
    </TeamListElementStyled>
  );
};

export default ChooseTeamsElement;
