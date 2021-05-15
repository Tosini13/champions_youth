import React, { useState } from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import { TeamData } from "../../../models/teamData";
import AddTeam from "../../teams/AddTeam";
import TeamList from "../../teams/TeamList";

import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { LOCALE } from "../../../locale/config";
import { ButtonStyled } from "../../../styled/styledButtons";
import { DialogRU } from "../../../styled/styledComponents/navigation/styledDialog";

type Props = {
  teams?: TeamData[];
  locale: LOCALE;
  isOwner: boolean;
  isCreated: boolean;
};

const TournamentTeams: React.FC<Props> = ({
  teams,
  locale,
  isOwner,
  isCreated,
}) => {
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
        <DialogRU
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={opened}
          color="primary"
          title={"addTeam"}
          locale={locale}
        >
          <AddTeam handleClose={handleClose} />
        </DialogRU>
        {isOwner ? (
          <ButtonStyled
            variant="outlined"
            color="secondary"
            onClick={handleOpen}
            style={{ margin: "5px auto", width: "fit-content" }}
            disabled={isCreated}
          >
            <Translator id="addTeam" />
          </ButtonStyled>
        ) : null}
        <TeamList teams={teams} isOwner={isOwner} isCreated={isCreated} />
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
