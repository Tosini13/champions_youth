import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Rosetta, Translator } from "react-rosetta";

import { MatchData } from "../../structures/match";
import { Match } from "../../models/matchData";
import { TeamData } from "../../models/teamData";
import { DialogTitle, LinkStyled } from "../../styled/styledLayout";
import { routerGenerateConst } from "../../const/menuConst";
import { Id } from "../../const/structuresConst";
import { matchGame } from "../../store/actions/PlayOffsActions";
import MatchSummary from "../matches/MatchSummary/MatchSummary";
import tournamentDetailsDict from "../../locale/tournamentDetails";
import useTranslationHelp from "../../hooks/useTranslationHelp";
import { DialogRU } from "../../styled/styledComponents/navigation/styledDialog";
import { useLocale } from "../../Provider/LocaleProvider";

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
  const { locale } = useLocale();
  const { translateRound } = useTranslationHelp();
  const { round: matchRound, number: matchNumber } = translateRound(
    match?.round ?? ""
  );
  const { round: returnMatchRound, number: returnMatchNumber } = translateRound(
    returnMatch?.round ?? ""
  );
  return (
    <DialogRU
      open={open}
      onClose={handleClose}
      title={matchRound}
      matchNumber={matchNumber}
    >
      <Rosetta translations={tournamentDetailsDict} locale={locale}>
        <>
          {match ? (
            <LinkStyled
              to={routerGenerateConst.matchPlayOffs(
                tournamentId,
                gameId,
                matchGame.match
              )}
            >
              <MatchSummary match={match} tournamentId={tournamentId} />
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
                <Translator id={returnMatchRound} /> {returnMatchNumber}
              </DialogTitle>
              <MatchSummary match={returnMatch} tournamentId={tournamentId} />
            </LinkStyled>
          ) : null}
        </>
      </Rosetta>
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
