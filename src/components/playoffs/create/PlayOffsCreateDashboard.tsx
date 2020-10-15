import React, { useState } from "react";

import PlayOffsChooseList from "./PlayOffsChooseList";
import PlayOffsCreateMenu from "./PlayOffsCreateMenu";
import PlayOffsCreateBracketMock from "./PlayOffsCreateBracketMock";
import { PromotedTeam } from "../../../const/groupConst";
import { BracketStructure } from "../../../structures/bracket";
import { TeamData } from "../../../models/teamData";
import { TournamentData } from "../../../models/tournamentData";
import { Options } from "../../../models/playOffsData";

type Props = {
  tournament: TournamentData;
  teams: TeamData[];
  toggleCreate: () => void;
};

const PlayOffsCreateDashboard: React.FC<Props> = ({
  tournament,
  teams,
  toggleCreate,
}) => {
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
    console.log(bracket);
    toggleCreate();
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
      <PlayOffsChooseList
        list={teams}
        chosenTeams={chosenTeams}
        setChosenTeams={handleSetChosenTeams}
      />
      <PlayOffsCreateBracketMock bracket={bracket} teams={teams} />
    </div>
  );
};

export default PlayOffsCreateDashboard;
