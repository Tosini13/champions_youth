import React, { useState } from "react";
import { useParams } from "react-router-dom";

import PlayOffsCreateMenu from "./PlayOffsCreateMenu";
import PlayOffsCreateBracketMock from "./PlayOffsCreateBracketMock";
import { BracketStructure } from "../../../structures/bracket";
import { TeamData } from "../../../models/teamData";
import { TournamentData } from "../../../models/tournamentData";
import { Options } from "../../../models/playOffsData";
import { createPlayoffs } from "../../../store/actions/PlayOffsActions";
import { connect } from "react-redux";
import { GameDataDb } from "../../../structures/dbAPI/gameData";
import { Id } from "../../../const/structuresConst";
import ChooseTeam from "./ChooseTeam";
import { GameStructure } from "../../../structures/game";

type Props = {
  tournament: TournamentData;
  teams: TeamData[];
  toggleCreate: () => void;
  createPlayoffs: (tournamentId: Id, game: GameDataDb[]) => void;
};

const PlayOffsCreateDashboard: React.FC<Props> = ({
  tournament,
  teams,
  toggleCreate,
  createPlayoffs,
}) => {
  const { tournamentId } = useParams<{ tournamentId: Id }>();
  const [options, setOptions] = useState<Options>({
    rounds: 4,
    placeMatchesQtt: 1,
  });
  const [chosenTeams, setChosenTeams] = useState<TeamData[]>(
    // | PromotedTeam[]
    // teams.slice(0, options.rounds * 2)
    []
  );
  let bracketInit = new BracketStructure(
    options.rounds,
    options.placeMatchesQtt
  );

  const [openTeams, setOpenTeams] = useState(false);
  const [game, setGame] = useState<GameStructure | null>(null);
  const [bracket, setBracket] = useState<BracketStructure>(bracketInit);

  const validRounds = (rounds: number) => {
    var i = 1;
    while (i * 2 < rounds) {
      i = i * 2;
    }
    return i;
  };

  const validPlaceMatches = (rounds: number, placeMatches: number) => {
    let placeMatchesQtt = placeMatches;
    if (placeMatchesQtt > rounds * 2) {
      placeMatchesQtt = rounds * 2 - 1;
    }
    return placeMatchesQtt;
  };

  const maxRounds = () => {
    let rounds = 1;
    while (rounds * 2 < teams.length) {
      rounds *= 2;
    }
    return rounds;
  };

  const setRounds = (rounds: number) => {
    let placeMatchesQtt = options.placeMatchesQtt;
    if (placeMatchesQtt >= rounds * 2) {
      placeMatchesQtt = rounds * 2 - 1;
    }
    const chosen = teams.slice(0, rounds * 2);
    const bracket = new BracketStructure(rounds, placeMatchesQtt);
    setOptions({
      ...options,
      rounds,
    });
    setChosenTeams(chosen);
    setBracket(bracket);
  };

  const setPlaceMatchesQtt = (placeMatchesQtt: number) => {
    if (placeMatchesQtt % 2) {
      const bracket = new BracketStructure(options.rounds, placeMatchesQtt);
      setOptions({
        ...options,
        placeMatchesQtt,
      });
      setBracket(bracket);
    }
  };

  const handleSetChosenTeams = (teams: TeamData[]) => {
    // | PromotedTeam[] ?!
    const rounds = validRounds(teams.length);
    const placeMatchesQtt = validPlaceMatches(rounds, options.placeMatchesQtt);
    setOptions({
      rounds,
      placeMatchesQtt,
    });
    setChosenTeams(teams);
    setBracket(bracket);
  };

  const submitBracket = () => {
    const convertedBracket = bracket.convertBracket();
    console.log(convertedBracket.games);
    createPlayoffs(tournamentId, convertedBracket.games);
    toggleCreate();
  };

  const handleCloseTeams = () => {
    setGame(null);
    setOpenTeams(false);
  };

  const handleOpenTeams = (game: GameStructure) => {
    setGame(game);
    setOpenTeams(true);
  };

  const handleUpdateBracket = (newBracket: BracketStructure) => {
    setBracket(newBracket);
  };

  return (
    <div>
      <PlayOffsCreateMenu
        toggleCreate={toggleCreate}
        maxRounds={maxRounds()}
        options={options}
        setRounds={setRounds}
        setPlaceMatchesQtt={setPlaceMatchesQtt}
        submitBracket={submitBracket}
      />
      <PlayOffsCreateBracketMock
        placeMatches={bracket.placeMatches}
        teams={teams}
        handleOpenTeams={handleOpenTeams}
      />
      {game ? (
        <ChooseTeam
          open={openTeams}
          bracket={bracket}
          handleUpdateBracket={handleUpdateBracket}
          handleClose={handleCloseTeams}
          handleSetChosenTeams={handleSetChosenTeams}
          teams={teams}
          chosenTeams={chosenTeams}
          game={game}
        />
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createPlayoffs: (tournamentId: Id, game: GameDataDb[]) =>
      dispatch(createPlayoffs(tournamentId, game)),
  };
};
export default connect(null, mapDispatchToProps)(PlayOffsCreateDashboard);
