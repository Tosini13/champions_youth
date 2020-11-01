import React, { useState } from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import { TeamData } from "../../../models/teamData";
import AddTeam from "../../teams/AddTeam";
import TeamList from "../../teams/TeamList";

import { Button } from "@material-ui/core";
import { DialogStyled, DialogTitle } from "../../../styled/styledLayout";
import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { LOCALE } from "../../../locale/config";

type Props = {
  teams?: TeamData[];
  locale: LOCALE;
};

const TournamentTeams: React.FC<Props> = ({ teams, locale }) => {
  const [opened, setOpened] = useState<boolean>(false);

  const handleClose = () => {
    setOpened(false);
  };

  const handleOpen = () => {
    setOpened(true);
  };

  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <>
        <DialogStyled
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={opened}
          color="primary"
        >
          <DialogTitle>
            <Translator id="addTeam" />
          </DialogTitle>
          <AddTeam handleClose={handleClose} />
        </DialogStyled>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleOpen}
          style={{ margin: "5px auto", width: "fit-content" }}
        >
          <Translator id="addTeam" />
        </Button>
        <TeamList teams={teams} />
      </>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(TournamentTeams);
