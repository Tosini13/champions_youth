import React, { useState, useEffect } from "react";

import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { TeamData } from "../../../../models/teamData";
import { Id } from "../../../../const/structuresConst";
import {
  getImage,
  getImageJustUploaded,
} from "../../../tournaments/actions/getImage";
import { TeamListElementStyled } from "../../../../styled/styledTeams";
import Logo, { SIZE_LOGO } from "../../../global/Logo";
import { IconButton } from "@material-ui/core";
import { ListItemTextStyled } from "../../../../styled/styledBracket";

type Props = {
  team: TeamData;
  userId: Id;
  tournamentId: Id;
  selected: boolean;
  restricted: boolean;
  handleChooseTeam: (selected: TeamData) => void;
};

const ChooseTeamsElement: React.FC<Props> = ({
  team,
  userId,
  tournamentId,
  selected,
  restricted,
  handleChooseTeam,
}) => {
  const [logo, setLogo] = useState<any>(null);

  useEffect(() => {
    if (team?.logo) {
      getImage(team.logo, tournamentId)
        .then((image) => {
          let img = image;
          if (!image && team.logo) {
            img = getImageJustUploaded(team.logo, tournamentId) ?? undefined;
          }
          setLogo(img);
        })
        .catch((err) => console.log("err", err));
    }
  }, [team, tournamentId]);

  return (
    <TeamListElementStyled
      button
      onClick={() => (restricted ? false : handleChooseTeam(team))}
    >
      <Logo src={logo} size={SIZE_LOGO.sm} />
      <>
        <ListItemTextStyled primary={team.name} style={{ marginLeft: "5px" }} />
        <ListItemSecondaryAction>
          <IconButton color={restricted ? "primary" : "secondary"} size="small">
            {selected ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </ListItemSecondaryAction>
      </>
    </TeamListElementStyled>
  );
};

export default ChooseTeamsElement;
