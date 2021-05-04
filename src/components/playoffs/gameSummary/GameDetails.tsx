import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import styled from "styled-components";
import { Id } from "../../../const/structuresConst";
import { LOCALE } from "../../../locale/config";
import { Game } from "../../../models/gameData";
import { TeamData } from "../../../models/teamData";
import { MatchData } from "../../../structures/match";
import { DialogRU } from "../../../styled/styledDialog";
import MatchSummary from "../../matches/MatchSummary/MatchSummary";

const GridContainer = styled(Grid)`
  padding: 10px 0px;
`;

export interface GameDetailsProps {
  locale: LOCALE;
  tournamentId: Id;
  open: boolean;
  game: Game;
  match?: MatchData;
  returnMatch?: MatchData;
  handleClose: () => void;
}

const GameDetails: React.FC<GameDetailsProps> = ({
  locale,
  tournamentId,
  open,
  game,
  match,
  returnMatch,
  handleClose,
}) => {
  return (
    <DialogRU open={open} onClose={handleClose} title={game.round}>
      {match ? (
        <GridContainer container>
          <Grid item xs={12}>
            <MatchSummary
              match={match}
              locale={locale}
              tournamentId={tournamentId}
            />
          </Grid>
          {returnMatch ? (
            <Grid item xs={12}>
              <MatchSummary
                match={returnMatch}
                locale={locale}
                tournamentId={tournamentId}
              />
            </Grid>
          ) : null}
        </GridContainer>
      ) : (
        <CircularProgress />
      )}
    </DialogRU>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  const matchData = state.firestore.data.bracketMatches?.match;
  const returnMatchData = state.firestore.data.bracketMatches?.returnMatch;
  console.log("matchData", matchData);
  const match: MatchData | undefined =
    matchData && teams
      ? {
          ...matchData,
          home: teams.find((team) => team.id === matchData.home),
          away: teams.find((team) => team.id === matchData.away),
        }
      : undefined;

  const returnMatch: MatchData | undefined =
    returnMatchData && teams
      ? {
          ...returnMatchData,
          home: teams.find((team) => team.id === returnMatchData.home),
          away: teams.find((team) => team.id === returnMatchData.away),
        }
      : undefined;
  return {
    locale: state.dictionary.locale,
    match,
    returnMatch,
    gameId: ownProps.gameId,
    tournamentId: ownProps.tournamentId,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props: any) => {
    return [
      {
        collection: "tournaments",
        doc: props.tournamentId,
        subcollections: [
          {
            collection: "playOffs",
            doc: props.gameId,
            subcollections: [
              { collection: "matches", orderBy: ["date", "asc"] },
            ],
          },
        ],
        storeAs: "bracketMatches",
      },
    ];
  })
)(GameDetails);
