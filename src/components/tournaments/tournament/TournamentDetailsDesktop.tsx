import React, { useState } from "react";

import {
  ContentContainerStyled,
  DesktopMainContainerStyled,
  DesktopMainDividerStyled,
  DesktopMainItemStyled,
  SectionContentStyled,
  SectionNavStyled,
  SectionStyled,
} from "../../../styled/styledLayout";
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
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import TournamentLeftMenu, {
  TOURNAMENT_LEFT_MENU,
} from "./nav/TournamentLeftMenu";

import TournamentRightMenu, {
  TOURNAMENT_RIGHT_MENU,
} from "./nav/TournamentRightMenu";
import { ScrollBarStyled } from "../../../styled/styledScrollBar";
import { LOCALE } from "../../../locale/config";

export const GridSectionStyled = styled(Grid)`
  max-height: 100%;
  flex-wrap: nowrap;
`;

export const GridSectionNavStyled = styled(Grid)``;

export const GridSectionContentStyled = styled(Grid)`
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  ${ScrollBarStyled}
`;

export interface TournamentDetailsDesktopProps {
  locale: LOCALE;
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
  locale,
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
    <DesktopMainContainerStyled>
      <DesktopMainItemStyled>
        <SectionStyled>
          <SectionNavStyled>
            <TournamentLeftMenu
              locale={locale}
              value={leftView}
              setValue={setLeftView}
            />
          </SectionNavStyled>
          <SectionContentStyled>
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
          </SectionContentStyled>
        </SectionStyled>
      </DesktopMainItemStyled>
      <DesktopMainDividerStyled />
      <DesktopMainItemStyled>
        <SectionStyled>
          <SectionNavStyled>
            <TournamentRightMenu
              locale={locale}
              value={rightView}
              setValue={setRightView}
            />
          </SectionNavStyled>
          <SectionContentStyled>
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
          </SectionContentStyled>
        </SectionStyled>
      </DesktopMainItemStyled>
    </DesktopMainContainerStyled>
  );
};

export default TournamentDetailsDesktop;
