import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import MatchDetailsDashboard from "./MatchDetailsDashboard";
import { Match } from "../../structures/dbAPI/matchData";
import { TeamData } from "../../models/teamData";
import MatchDetailsDisplay from "./MatchDetailsDisplay";
import { Id, Result } from "../../const/structuresConst";
import SplashScreen from "../global/SplashScreen";
import { matchModeConst } from "../../const/matchConst";
import { UpdateMatch, updateMatch } from "../../store/actions/MatchActions";
import { Game } from "../../models/gameData";
import { GameDataDb } from "../../structures/dbAPI/gameData";
import { updateGame, UpdateGame } from "../../store/actions/GameActions";

type Props = {
  nextWinner?: GameDataDb;
  nextLoser?: GameDataDb;
  game?: Game;
  matchData: Match;
  authorId: Id;
  tournamentId: Id;
  groupId: Id;
  gameId: Id;
  matchId: Id;
  updateMatch: ({
    tournamentId,
    groupId,
    gameId,
    matchId,
    mode,
    result,
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
  nextWinner,
  nextLoser,
  game,
  matchData,
  authorId,
  tournamentId,
  groupId,
  gameId,
  matchId,
  updateMatch,
  updateGame,
}) => {
  if (matchData === undefined) return <SplashScreen />;

  const getWinnerTeam = ( reset?: boolean) => {
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

  const getLoserTeam = ( reset?: boolean) => {
    if (reset) return null;
    if (!matchData.result) return undefined;
    if (matchData.result?.home > matchData.result?.away) {
      return matchData.away?.id;
    }
    if (matchData.result?.home < matchData.result?.away) {
      return matchData.home?.id;
    }
  };

  const updateNextGames = (winner?: GameDataDb, loser?: GameDataDb, reset?: boolean) => {
    if (winner?.previousMatchHome === gameId) {
      updateGame({
        tournamentId,
        gameId: winner.id,
        homeTeam: getWinnerTeam(reset),
        returnMatch: false,
      });
    }

    if (winner?.previousMatchAway === gameId) {
      updateGame({
        tournamentId,
        gameId: winner.id,
        awayTeam: getWinnerTeam(reset),
        returnMatch: false,
      });
    }

    if (loser?.previousMatchHome === gameId) {
      updateGame({
        tournamentId,
        gameId: loser.id,
        homeTeam: getLoserTeam(reset),
        returnMatch: false,
      });
    }

    if (loser?.previousMatchAway === gameId) {
      updateGame({
        tournamentId,
        gameId: loser.id,
        awayTeam: getLoserTeam(reset),
        returnMatch: false,
      });
    }
  };

  const updateMode = (mode: matchModeConst) => {
    updateMatch({ tournamentId, groupId, gameId, matchId, mode });
  };

  const updateResult = (result: Result) => {
    updateMatch({ tournamentId, groupId, gameId, matchId, result });
  };

  const resetMatch = () => {
    const mode = matchModeConst.notStarted;
    const result: Result | null = null;
    updateMatch({ tournamentId, groupId, gameId, matchId, mode, result });
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
    updateMatch({ tournamentId, groupId, gameId, matchId, mode, result });
  };

  const finishMatch = () => {
    const mode = matchModeConst.finished;
    updateMatch({ tournamentId, groupId, gameId, matchId, mode });
    if (game) {
      updateNextGames(nextWinner, nextLoser);
    }
  };

  return (
    <>
      <MatchDetailsDisplay match={matchData} authorId={authorId} />
      <MatchDetailsDashboard
        match={matchData}
        updateMode={updateMode}
        updateResult={updateResult}
        resetMatch={resetMatch}
        startMatch={startMatch}
        finishMatch={finishMatch}
      />
    </>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const { tournamentId, groupId, gameId, matchId } = ownProps.match.params;
  const authorId = state.firebase.auth.uid;
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;

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
  const matches = state.firestore.data.matches;
  const match = matches ? matches[matchId] : undefined;
  const matchData = match && teams ? new Match(match, teams) : undefined;
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
    }: UpdateMatch) =>
      dispatch(
        updateMatch({ tournamentId, groupId, gameId, matchId, mode, result })
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
