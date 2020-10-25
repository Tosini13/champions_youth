import { Button } from "@material-ui/core";
import React from "react";

import { TeamData } from "../../../models/teamData";
import { DialogStyled } from "../../../styled/styledLayout";
import PlayOffsChooseList from "./PlayOffsChooseList";

type Props = {
  teams: TeamData[];
  chosenTeams: TeamData[]; // | PromotedTeam[]
  handleClose: () => void;
  handleSetChosenTeams: (teams: TeamData[]) => void; // | PromotedTeam[]
  open: boolean;
};

const ChooseTeam: React.FC<Props> = ({
  handleClose,
  open,
  teams,
  chosenTeams,
  handleSetChosenTeams,
}) => {
  return (
    <DialogStyled open={open} onClose={handleClose}>
      <PlayOffsChooseList
        list={teams}
        chosenTeams={chosenTeams}
        setChosenTeams={handleSetChosenTeams}
      />
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => handleClose}
        style={{
          margin: "0px 5px 5px 5px",
        }}
      >
        Ok
      </Button>
    </DialogStyled>
  );
};

export default ChooseTeam;
