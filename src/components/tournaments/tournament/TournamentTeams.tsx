import React, { useState } from "react";

import { TeamData } from "../../../models/teamData";
import AddTeam from "../../teams/AddTeam";
import TeamList from "../../teams/TeamList";

import { Button } from "@material-ui/core";
import { DialogStyled, DialogTitle } from "../../../styled/styledLayout";

type Props = {
  teams?: TeamData[];
};

const TournamentTeams: React.FC<Props> = ({ teams }) => {
  const [opened, setOpened] = useState<boolean>(false);

  const handleClose = () => {
    setOpened(false);
    console.log('close!', opened);
  };

  const handleOpen = () => {
    setOpened(true);
  };

  return (
    <>
      <DialogStyled
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={opened}
        color="primary"
      >
        <DialogTitle>Dodaj zespół</DialogTitle>
        <AddTeam handleClose={handleClose} />
      </DialogStyled>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleOpen}
        style={{ margin: "5px auto", width: "fit-content" }}
      >
        Dodaj zespół
      </Button>
      <TeamList teams={teams} />
    </>
  );
};

export default TournamentTeams;
