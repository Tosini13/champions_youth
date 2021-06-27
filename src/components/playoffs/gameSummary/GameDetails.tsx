import { Grid } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import styled from "styled-components";
import { routerGenerateConst } from "../../../const/menuConst";
import { Id } from "../../../const/structuresConst";
import { Game } from "../../../models/gameData";
import { TeamData } from "../../../models/teamData";
import { MatchData } from "../../../structures/match";
import { DialogRU } from "../../../styled/styledComponents/navigation/styledDialog";
import CircularProgressRU from "../../../styled/styledComponents/styledLoading";
import { LinkStyled } from "../../../styled/styledLayout";
import MatchSummary from "../../matches/MatchSummary/MatchSummary";

const GridContainer = styled(Grid)`
  padding: 10px 0px;
`;

export interface GameDetailsProps {
  tournamentId: Id;
  open: boolean;
  game: Game;
  match?: MatchData;
  returnMatch?: MatchData;
  handleClose: () => void;
}

const GameDetails: React.FC<GameDetailsProps> = ({
  tournamentId,
  open,
  game,
  match,
  returnMatch,
  handleClose,
}) => {
  return (
    <DialogRU open={open} onClose={handleClose}>
      <>
        {match ? (
          <GridContainer container>
            <Grid item xs={12}>
              <LinkStyled
                to={routerGenerateConst.matchPlayOffs(
                  tournamentId,
                  game.id,
                  match.id
                )}
              >
                <MatchSummary match={match} />
              </LinkStyled>
            </Grid>
            {returnMatch ? (
              <Grid item xs={12}>
                <MatchSummary match={returnMatch} />
              </Grid>
            ) : null}
          </GridContainer>
        ) : (
          <Grid container justify="center">
            <Grid item>
              <CircularProgressRU />
            </Grid>
          </Grid>
        )}
      </>
    </DialogRU>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  const matchData = state.firestore.data.bracketMatches?.match;
  const returnMatchData = state.firestore.data.bracketMatches?.returnMatch;
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
