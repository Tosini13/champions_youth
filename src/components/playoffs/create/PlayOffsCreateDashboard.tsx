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
    roundsActive: false,
  });
  const [chosenTeams, setChosenTeams] = useState<TeamData[]>(
    // | PromotedTeam[]
    teams.slice(0, options.rounds * 2)
  );
  let bracketInit = new BracketStructure(
    options.rounds,
    options.placeMatchesQtt
  );
  bracketInit.initBracketWithTeams(chosenTeams);
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

  const setRounds = (rounds: number) => {
    let placeMatchesQtt = options.placeMatchesQtt;
    if (placeMatchesQtt >= rounds * 2) {
      placeMatchesQtt = rounds * 2 - 1;
    }
    const chosen = teams.slice(0, rounds * 2);
    const bracket = new BracketStructure(rounds, placeMatchesQtt);
    bracket.initBracketWithTeams(chosen);
    setOptions({
      ...options,
      rounds,
    });
    setChosenTeams(chosen);
    setBracket(bracket);
  };

  const setPlaceMatchesQtt = (placeMatchesQtt: number) => {
    if (placeMatchesQtt % 2) {
      const chosen = teams.slice(0, options.rounds * 2);
      const bracket = new BracketStructure(options.rounds, placeMatchesQtt);
      bracket.initBracketWithTeams(chosen);
      setOptions({
        ...options,
        placeMatchesQtt,
      });
      setBracket(bracket);
    }
  };

  const toggleRoundsActive = () => {
    setOptions({
      ...options,
      roundsActive: !options.roundsActive,
    });
  };

  const handleSetChosenTeams = (teams: TeamData[]) => {
    // | PromotedTeam[] ?!
    const rounds = validRounds(teams.length);
    const placeMatchesQtt = validPlaceMatches(rounds, options.placeMatchesQtt);
    const bracket = new BracketStructure(rounds, placeMatchesQtt);
    bracket.initBracketWithTeams(teams);
    setOptions({
      roundsActive: false,
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

  const [openTeams, setOpenTeams] = useState(false);

  const handleCloseTeams = () => {
    setOpenTeams(false);
  };

  const handleOpenTeams = (game: GameStructure) => {
    console.log(game);
    setOpenTeams(true);
  };

  return (
    <div>
      <PlayOffsCreateMenu
        toggleCreate={toggleCreate}
        options={options}
        setRounds={setRounds}
        setPlaceMatchesQtt={setPlaceMatchesQtt}
        toggleRoundsActive={toggleRoundsActive}
        submitBracket={submitBracket}
      />
      {/* <PlayOffsChooseList
        list={teams}
        chosenTeams={chosenTeams}
        setChosenTeams={handleSetChosenTeams}
      /> */}
      <PlayOffsCreateBracketMock
        bracket={bracket}
        teams={teams}
        handleOpenTeams={handleOpenTeams}
      />
      <ChooseTeam
        open={openTeams}
        handleClose={handleCloseTeams}
        handleSetChosenTeams={handleSetChosenTeams}
        teams={teams}
        chosenTeams={chosenTeams}
      />
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
