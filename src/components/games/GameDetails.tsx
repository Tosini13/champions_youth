import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { MatchData } from "../../structures/match";
import { Match } from "../../models/matchData";
import { TeamData } from "../../models/teamData";
import { DialogTitle, LinkStyled } from "../../styled/styledLayout";
import { routerGenerateConst } from "../../const/menuConst";
import { Id } from "../../const/structuresConst";
import { matchGame } from "../../store/actions/PlayOffsActions";
import MatchSummary from "../matches/MatchSummary/MatchSummary";
import useTranslationHelp from "../../hooks/useTranslationHelp";
import { DialogRU } from "../../styled/styledComponents/navigation/styledDialog";
import { ShowRound } from "../../styled/styledComponents/match/styledTypography";

type Props = {
  handleClose: () => void;
  open: boolean;
  match?: MatchData;
  returnMatch?: MatchData;
  gameId: Id;
  tournamentId: Id;
};

const GameDetails: React.FC<Props> = ({
  handleClose,
  open,
  match,
  returnMatch,
  gameId,
  tournamentId,
}) => {
  const { translateRound } = useTranslationHelp();
  const { round: matchRound, number: matchNumber } = translateRound(
    match?.round ?? ""
  );
  return (
    <DialogRU
      open={open}
      onClose={handleClose}
      title={matchRound}
      matchNumber={matchNumber}
    >
      <>
        {match ? (
          <LinkStyled
            to={routerGenerateConst.matchPlayOffs(
              tournamentId,
              gameId,
              matchGame.match
            )}
          >
            <MatchSummary match={match} />
          </LinkStyled>
        ) : null}
        {returnMatch ? (
          <LinkStyled
            to={routerGenerateConst.matchPlayOffs(
              tournamentId,
              gameId,
              matchGame.returnMatch
            )}
          >
            <DialogTitle>
              {match?.round ? <ShowRound round={match?.round} /> : ""}
            </DialogTitle>
            <MatchSummary match={returnMatch} />
          </LinkStyled>
        ) : null}
      </>
    </DialogRU>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  const teams: TeamData[] | undefined = state.firestore.ordered.teams;
  const matchData = state.firestore.data.bracketMatches
    ? state.firestore.data.bracketMatches.match
    : undefined;
  const returnMatchData = state.firestore.data.bracketMatches
    ? state.firestore.data.bracketMatches.returnMatch
    : undefined;

  const match = matchData && teams ? new Match(matchData, teams) : undefined;
  const returnMatch =
    returnMatchData && teams ? new Match(returnMatchData, teams) : undefined;
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
