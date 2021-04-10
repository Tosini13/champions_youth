import React, { useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import styled from "styled-components";

import { Share as ShareIcon } from "@material-ui/icons";

import MatchDetailsDashboard from "./MatchDetailsDashboard";
import { Match } from "../../structures/dbAPI/matchData";
import { TeamData } from "../../models/teamData";
import MatchDetailsDisplay from "./MatchDetailsDisplay";
import { Id, Result } from "../../const/structuresConst";
import SplashScreen from "../global/SplashScreen";
import { matchModeConst } from "../../const/matchConst";
import { UpdateMatch, updateMatch } from "../../store/actions/MatchActions";
import { Game } from "../../models/gameData";
import { MatchModelDB } from "../../NewModels/Matches";
import { GameDataDb } from "../../structures/dbAPI/gameData";
import { updateGame, UpdateGame } from "../../store/actions/GameActions";
import { matchGame } from "../../store/actions/PlayOffsActions";
import { routerConstString } from "../../const/menuConst";
import { GroupModelDB } from "../../NewModels/Group";
import { Grid, Hidden, IconButton, Paper } from "@material-ui/core";
import { mainTheme } from "../../styled/styledConst";
import { LOCALE } from "../../locale/config";
import Share from "../share/Share";
import { routerGenerateConst } from "../../const/menuConst";

const PaperStyled = styled(Paper)`
  background-color: ${mainTheme.palette.primary.main};
  padding: 5px;
`;

const IconButtonDesktopStyled = styled(IconButton)`
  position: absolute;
  right: 0px;
  top: 0px;
  transform: translateY(-105%);
`;

type Props = {
  0;
  locale: LOCALE;
  nextWinner?: GameDataDb;
  nextLoser?: GameDataDb;
  game?: Game;
  matchData: Match;
  authorId: Id;
  tournamentId: Id;
  groupId: Id;
  gameId: Id;
  matchId: Id;
  playOffsGroup: boolean;
  updateMatch: ({
    tournamentId,
    groupId,
    gameId,
    matchId,
    mode,
    result,
    homeTeam,
    awayTeam,
    playOffsGroup,
  }: UpdateMatch) => void;
  updateGame: ({
    tournamentId,
    gameId,
    homeTeam,
    awayTeam,
    returnMatch,
  }: UpdateGame) => void;
};

const MatchDetails: React.FC<Props> = ({
  locale,
  nextWinner,
  nextLoser,
  game,
  matchData,
  authorId,
  tournamentId,
  groupId,
  gameId,
  matchId,
  playOffsGroup,
  updateMatch,
  updateGame,
}) => {
  const [openShare, setOpenShare] = useState<boolean>(false);

  const getLink = () => {
    if (groupId && !playOffsGroup) {
      return `${
        process.env.REACT_APP_URL
      }${routerGenerateConst.directMatchGroup(tournamentId, groupId, matchId)}`;
    }

    if (groupId && playOffsGroup) {
      return `${
        process.env.REACT_APP_URL
      }${routerGenerateConst.directMatchPlayOffsGroup(
        tournamentId,
        groupId,
        matchId
      )}`;
    }

    if (gameId) {
      return `${process.env.REACT_APP_URL}${routerGenerateConst.matchPlayOffs(
        tournamentId,
        gameId,
        matchId
      )}`;
    }
    return "";
  };

  const getWinnerTeam = (reset?: boolean) => {
    if (reset) return null;
    if (!matchData.result) return undefined;
    if (matchData.result?.home > matchData.result?.away) {
      return matchData.home?.id;
    }
    if (matchData.result?.home < matchData.result?.away) {
      return matchData.away?.id;
    }
    return undefined;
  };

  const getLoserTeam = (reset?: boolean) => {
    if (reset) return null;
    if (!matchData.result) return undefined;
    if (matchData.result?.home > matchData.result?.away) {
      return matchData.away?.id;
    }
    if (matchData.result?.home < matchData.result?.away) {
      return matchData.home?.id;
    }
  };

  const updateNextGames = (
    winner?: GameDataDb,
    loser?: GameDataDb,
    reset?: boolean
  ) => {
    if (winner?.previousMatchHome === gameId) {
      const homeTeam = getWinnerTeam(reset);
      updateMatch({
        tournamentId,
        groupId,
        gameId: winner.id,
        matchId: matchGame.match,
        homeTeam,
      });
      updateGame({
        tournamentId,
        gameId: winner.id,
        homeTeam,
        returnMatch: false,
      });
    }

    if (winner?.previousMatchAway === gameId) {
      const awayTeam = getWinnerTeam(reset);
      updateMatch({
        tournamentId,
        groupId,
        gameId: winner.id,
        matchId: matchGame.match,
        awayTeam,
      });
      updateGame({
        tournamentId,
        gameId: winner.id,
        awayTeam,
        returnMatch: false,
      });
    }

    if (loser?.previousMatchHome === gameId) {
      const homeTeam = getLoserTeam(reset);
      updateMatch({
        tournamentId,
        groupId,
        gameId: loser.id,
        matchId: matchGame.match,
        homeTeam,
      });
      updateGame({
        tournamentId,
        gameId: loser.id,
        homeTeam: getLoserTeam(reset),
        returnMatch: false,
      });
    }

    if (loser?.previousMatchAway === gameId) {
      const awayTeam = getLoserTeam(reset);
      updateMatch({
        tournamentId,
        groupId,
        gameId: loser.id,
        matchId: matchGame.match,
        awayTeam,
      });
      updateGame({
        tournamentId,
        gameId: loser.id,
        awayTeam: getLoserTeam(reset),
        returnMatch: false,
      });
    }
  };

  const updateMode = (mode: matchModeConst) => {
    updateMatch({
      tournamentId,
      groupId,
      gameId,
      matchId,
      mode,
      playOffsGroup,
    });
  };

  const updateResult = (result: Result) => {
    updateMatch({
      tournamentId,
      groupId,
      gameId,
      matchId,
      result,
      playOffsGroup,
    });
  };

  const resetMatch = () => {
    const mode = matchModeConst.notStarted;
    const result: Result | null = null;
    updateMatch({
      tournamentId,
      groupId,
      gameId,
      matchId,
      mode,
      result,
      playOffsGroup,
    });
    if (game) {
      updateNextGames(nextWinner, nextLoser, true);
    }
  };

  const startMatch = () => {
    const mode = matchModeConst.live;
    const result: Result = {
      home: 0,
      away: 0,
    };
    updateMatch({
      tournamentId,
      groupId,
      gameId,
      matchId,
      mode,
      result,
      playOffsGroup,
    });
  };

  const finishMatch = () => {
    const mode = matchModeConst.finished;
    updateMatch({
      tournamentId,
      groupId,
      gameId,
      matchId,
      mode,
      playOffsGroup,
    });
    if (game) {
      updateNextGames(nextWinner, nextLoser);
    }
  };

  if (matchData === undefined) return <SplashScreen />;
  return (
    <>
      <Hidden smDown>
        <Grid
          container
          spacing={3}
          justify="center"
          alignItems="center"
          style={{ width: "100%", height: "100%" }}
        >
          <Grid item lg={6} md={8}>
            <PaperStyled
              style={{ padding: "10px", position: "relative" }}
              color="primary"
            >
              <IconButtonDesktopStyled>
                <ShareIcon
                  color="secondary"
                  onClick={() => setOpenShare(true)}
                />
              </IconButtonDesktopStyled>
              <MatchDetailsDisplay
                match={matchData}
                authorId={authorId}
                tournamentId={tournamentId}
              />
              <MatchDetailsDashboard
                locale={locale}
                match={matchData}
                updateMode={updateMode}
                updateResult={updateResult}
                resetMatch={resetMatch}
                startMatch={startMatch}
                finishMatch={finishMatch}
              />
            </PaperStyled>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <MatchDetailsDisplay
          match={matchData}
          authorId={authorId}
          tournamentId={tournamentId}
        />
        <Grid container justify="center">
          <Grid item>
            <IconButton style={{ margin: "auto" }}>
              <ShareIcon color="secondary" onClick={() => setOpenShare(true)} />
            </IconButton>
          </Grid>
        </Grid>
        <MatchDetailsDashboard
          locale={locale}
          match={matchData}
          updateMode={updateMode}
          updateResult={updateResult}
          resetMatch={resetMatch}
          startMatch={startMatch}
          finishMatch={finishMatch}
        />
      </Hidden>
      <Share
        locale={locale}
        open={openShare}
        handleClose={() => setOpenShare(false)}
        message={getLink()}
      />
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const { tournamentId, groupId, gameId, matchId } = ownProps.match.params;
  const authorId = state.firebase.auth.uid;
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;

  const groups: GroupModelDB[] | undefined = state.firestore.ordered.groups;
  const playOffsGroups: GroupModelDB[] | undefined =
    state.firestore.data.playOffsGroups;
  const playOffsGroup = playOffsGroups ? playOffsGroups[groupId] : undefined;
  let games: Game[] | undefined;
  let game: Game | undefined;
  let nextWinner: GameDataDb | undefined;
  let nextLoser: GameDataDb | undefined;
  if (gameId) {
    const gamesData: GameDataDb[] | undefined = state.firestore.ordered.games;
    games =
      gamesData && teams
        ? gamesData.map((game) => new Game(game, teams))
        : undefined;
    game = games?.find((game) => game.id === gameId);
    nextWinner = gamesData?.find(
      (gameData) => gameData.id === game?.winnerMatch
    );
    nextLoser = gamesData?.find((gameData) => gameData.id === game?.loserMatch);
  }
  const matches: MatchModelDB[] = state.firestore.data.matches;
  const match = matches ? matches[matchId] : undefined;
  let matchData =
    match && teams
      ? new Match({ matchDataDb: match, teams, playOffsGroup, groups })
      : undefined;
  return {
    nextWinner,
    nextLoser,
    game,
    matchData,
    authorId,
    tournamentId,
    groupId,
    gameId,
    matchId,
    playOffsGroup: ownProps.match.path === routerConstString.matchPlayOffsGroup,
    locale: state.dictionary.locale,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateMatch: ({
      tournamentId,
      groupId,
      gameId,
      matchId,
      mode,
      result,
      homeTeam,
      awayTeam,
      playOffsGroup,
    }: UpdateMatch) =>
      dispatch(
        updateMatch({
          tournamentId,
          groupId,
          gameId,
          matchId,
          mode,
          result,
          homeTeam,
          awayTeam,
          playOffsGroup,
        })
      ),
    updateGame: ({
      tournamentId,
      gameId,
      homeTeam,
      awayTeam,
      returnMatch,
    }: UpdateGame) =>
      dispatch(
        updateGame({
          tournamentId,
          gameId,
          homeTeam,
          awayTeam,
          returnMatch,
        })
      ),
  };
};

export default compose(
  firestoreConnect((props: any) => {
    if (props.match.path === routerConstString.matchPlayOffsGroup) {
      return [
        {
          collection: "tournaments",
          doc: props.match.params.tournamentId,
          subcollections: [{ collection: "teams" }],
          storeAs: "teams",
        },
        {
          collection: "tournaments",
          doc: props.match.params.tournamentId,
          subcollections: [{ collection: "playOffsGroups" }],
          storeAs: "playOffsGroups",
        },
        {
          collection: "tournaments",
          doc: props.match.params.tournamentId,
          subcollections: [{ collection: "groups" }],
          storeAs: "groups",
        },
        {
          collection: "tournaments",
          doc: props.match.params.tournamentId,
          subcollections: [
            {
              collection: "playOffsGroups",
              doc: props.match.params.groupId,
              subcollections: [{ collection: "matches" }],
            },
          ],
          storeAs: "matches",
        },
      ];
    }
    if (props.match.params.groupId) {
      return [
        {
          collection: "tournaments",
          doc: props.match.params.tournamentId,
          subcollections: [{ collection: "teams" }],
          storeAs: "teams",
        },
        {
          collection: "tournaments",
          doc: props.match.params.tournamentId,
          subcollections: [
            {
              collection: "groups",
              doc: props.match.params.groupId,
              subcollections: [{ collection: "matches" }],
            },
          ],
          storeAs: "matches",
        },
      ];
    }
    if (props.match.params.gameId) {
      return [
        {
          collection: "tournaments",
          doc: props.match.params.tournamentId,
          subcollections: [{ collection: "teams" }],
          storeAs: "teams",
        },
        {
          collection: "tournaments",
          doc: props.match.params.tournamentId,
          subcollections: [
            {
              collection: "playOffs",
              doc: props.match.params.gameId,
              subcollections: [{ collection: "matches" }],
            },
          ],
          storeAs: "matches",
        },
        {
          collection: "tournaments",
          doc: props.match.params.tournamentId,
          subcollections: [{ collection: "playOffs" }],
          storeAs: "games",
        },
      ];
    }
    return [];
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(MatchDetails);
