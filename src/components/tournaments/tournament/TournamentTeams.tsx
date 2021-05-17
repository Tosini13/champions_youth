import React, { useState } from "react";
import { Rosetta, Translator } from "react-rosetta";

import { TeamData } from "../../../models/teamData";
import TeamForm from "../../teams/TeamForm";
import TeamList from "../../teams/TeamList";

import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { ButtonStyled } from "../../../styled/styledButtons";
import { DialogRU } from "../../../styled/styledComponents/navigation/styledDialog";
import {
  SectionContentStyled,
  SectionFooterStyled,
  SectionStyled,
} from "../../../styled/styledLayout";
import { useLocale } from "../../../Provider/LocaleProvider";

type Props = {
  teams?: TeamData[];
  isOwner: boolean;
  isCreated: boolean;
};

const TournamentTeams: React.FC<Props> = ({ teams, isOwner, isCreated }) => {
  const { locale } = useLocale();
  const [opened, setOpened] = useState<boolean>(false);

  const handleClose = () => {
    setOpened(false);
  };

  const handleOpen = () => {
    setOpened(true);
  };

  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <SectionStyled>
        <DialogRU
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={opened}
          color="primary"
          title={"addTeam"}
        >
          <TeamForm handleClose={handleClose} />
        </DialogRU>
        <SectionContentStyled>
          <TeamList teams={teams} isOwner={isOwner} isCreated={isCreated} />
        </SectionContentStyled>
        <SectionFooterStyled>
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
        </SectionFooterStyled>
      </SectionStyled>
    </Rosetta>
  );
};

export default TournamentTeams;
