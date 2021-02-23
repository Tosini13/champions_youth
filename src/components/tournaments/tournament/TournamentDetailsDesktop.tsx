import React, { useState } from "react";

import { ContentContainerStyled } from "../../../styled/styledLayout";
import TournamentTeams from "./TournamentTeams";
import TournamentGroups from "./TournamentGroups";
import { TeamData } from "../../../models/teamData";
import { Game } from "../../../models/gameData";
import { TournamentData } from "../../../models/tournamentData";
import { Id } from "../../../const/structuresConst";
import TournamentInfo from "./TournamentInfo";
import { Group } from "../../../models/groupData";
import TournamentPlayOffs from "./TournamentPlayOffs";
import { GroupModel } from "../../../NewModels/Group";
import { Divider, Grid } from "@material-ui/core";
import styled from "styled-components";
import TournamentLeftMenu, {
  TOURNAMENT_LEFT_MENU,
} from "./nav/TournamentLeftMenu";

import TournamentRightMenu, {
  TOURNAMENT_RIGHT_MENU,
} from "./nav/TournamentRightMenu";

const GridContainerStyled = styled(Grid)`
  height: 100%;
`;

const GridItemStyled = styled(Grid)`
  max-width: 50%;
  flex-grow: 1;
`;

export interface TournamentDetailsDesktopProps {
  image: any | null;
  tournament?: TournamentData;
  teams?: TeamData[];
  groups?: Group[];
  playOffsGroups?: GroupModel[];
  playOffs?: Game[];
  tournamentId?: Id;
  authorId?: Id;
  isOwner: boolean;
}

const TournamentDetailsDesktop: React.FC<TournamentDetailsDesktopProps> = ({
  image,
  isOwner,
  tournamentId,
  tournament,
  teams,
  groups,
  playOffs,
  playOffsGroups,
}) => {
  const [leftView, setLeftView] = useState<TOURNAMENT_LEFT_MENU>(0);
  const [rightView, setRightView] = useState<TOURNAMENT_RIGHT_MENU>(
    TOURNAMENT_RIGHT_MENU.GROUPS
  );
  return (
    <GridContainerStyled container>
      <GridItemStyled item>
        <Grid container direction="column">
          <Grid item>
            <TournamentLeftMenu value={leftView} setValue={setLeftView} />
          </Grid>
          <Grid item>
            <ContentContainerStyled>
              {leftView === TOURNAMENT_LEFT_MENU.INFO && tournament ? (
                <TournamentInfo
                  tournament={tournament}
                  image={image}
                  isOwner={isOwner}
                  tournamentId={tournamentId}
                />
              ) : null}
              {leftView === TOURNAMENT_LEFT_MENU.TEAMS && tournament ? (
                <TournamentTeams
                  teams={teams}
                  isOwner={isOwner}
                  isCreated={Boolean(playOffs?.length || groups?.length)}
                />
              ) : null}
            </ContentContainerStyled>
          </Grid>
        </Grid>
      </GridItemStyled>
      <Divider orientation="vertical" />
      <GridItemStyled item>
        <Grid container direction="column">
          <Grid item>
            <TournamentRightMenu value={rightView} setValue={setRightView} />
          </Grid>
          <Grid item>
            <ContentContainerStyled>
              {rightView === TOURNAMENT_RIGHT_MENU.GROUPS && tournament ? (
                <TournamentGroups
                  tournamentId={tournamentId}
                  tournament={tournament}
                  groups={groups}
                  playOffs={Boolean(playOffs?.length)}
                  playOffsGroups={Boolean(playOffsGroups?.length)}
                  teams={teams}
                  isOwner={isOwner}
                />
              ) : null}
              {rightView === TOURNAMENT_RIGHT_MENU.PLAY_OFFS &&
              tournament &&
              playOffs ? (
                <TournamentPlayOffs
                  tournamentId={tournamentId}
                  tournament={tournament}
                  playOffs={playOffs}
                  playOffsGroups={playOffsGroups}
                  teams={teams}
                  groups={groups}
                  isOwner={isOwner}
                />
              ) : null}
            </ContentContainerStyled>
          </Grid>
        </Grid>
      </GridItemStyled>
    </GridContainerStyled>
  );
};

export default TournamentDetailsDesktop;
