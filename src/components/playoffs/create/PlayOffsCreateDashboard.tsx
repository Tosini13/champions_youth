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
import { GameStructure } from "../../../structures/game";
import { Placeholder } from "../../../const/groupConst";
import { Group } from "../../../models/groupData";
import Choose from "./chooseTeams/Choose";

const shuffle = (arr: any) => {
  let indexes: any[] = [];
  let newArr: any[] = [];
  while (indexes.length < arr.length) {
    const j = Math.floor(Math.random() * arr.length);
    if (!indexes.includes(j)) {
      indexes.push(j);
      newArr.push(arr[j]);
    }
  }
  return newArr;
};

const getGroupsPromoted = (groups: Group[]) => {
  const promoted: Placeholder[] = [];
  let maxLength = 0;
  groups.forEach((group) =>
    maxLength < group.promoted.length
      ? (maxLength = group.promoted.length)
      : null
  );
  for (let i = 0; i < maxLength; i++) {
    groups.forEach((group) => {
      const promotedTeam = {
        ...group.promoted[i],
        id: group.id ? group.id : undefined,
      };
      if (promotedTeam) promoted.push(promotedTeam);
    });
  }
  return promoted;
};

type Props = {
  tournament: TournamentData;
  teams?: TeamData[];
  groups?: Group[];
  toggleCreate: () => void;
  createPlayoffs: (tournamentId: Id, game: GameDataDb[]) => void;
};

const PlayOffsCreateDashboard: React.FC<Props> = ({
  tournament,
  teams,
  groups,
  toggleCreate,
  createPlayoffs,
}) => {
  const countPromoted = () => {
    let teamsQtt = 0;
    groups?.forEach((group) => (teamsQtt += group.promoted.length));
    return teamsQtt;
  };

  const maxRounds = () => {
    let rounds = 1;
    let teamsQtt = 0;
    if (teams) teamsQtt = teams.length;
    if (groups?.length) teamsQtt = countPromoted();
    while (rounds * 2 < teamsQtt) {
      rounds *= 2;
    }
    return rounds;
  };

  const [chosenTeams, setChosenTeams] = useState<TeamData[]>([]);
  const [chosenPromoted, setChosenPromoted] = useState<Placeholder[]>([]);
  const { tournamentId } = useParams<{ tournamentId: Id }>();
  const [options, setOptions] = useState<Options>({
    rounds: maxRounds(),
    placeMatchesQtt: 1,
  });

  let bracketInit = new BracketStructure(
    options.rounds,
    options.placeMatchesQtt
  );

  const [openTeams, setOpenTeams] = useState(false);
  const [game, setGame] = useState<GameStructure | null>(null);
  const [bracket, setBracket] = useState<BracketStructure>(bracketInit);

  const setRounds = (rounds: number) => {
    let placeMatchesQtt = options.placeMatchesQtt;
    if (placeMatchesQtt >= rounds * 2) {
      placeMatchesQtt = rounds * 2 - 1;
    }
    const bracket = new BracketStructure(rounds, placeMatchesQtt);
    setOptions({
      rounds,
      placeMatchesQtt,
    });
    setBracket(bracket);
    setChosenTeams([]);
    setChosenPromoted([]);
  };

  const setPlaceMatchesQtt = (placeMatchesQtt: number) => {
    if (placeMatchesQtt % 2) {
      const bracket = new BracketStructure(options.rounds, placeMatchesQtt);
      setOptions({
        ...options,
        placeMatchesQtt,
      });
      setBracket(bracket);
      setChosenTeams([]);
      setChosenPromoted([]);
    }
  };

  const setAutoTeams = () => {
    const bracket = new BracketStructure(
      options.rounds,
      options.placeMatchesQtt
    );
    if (groups?.length) {
      const promoted = getGroupsPromoted(groups);
      console.log(promoted);
      const used =bracket.initBracketWithPlaceholders(promoted);
      console.log(used);
      setChosenPromoted(used);
    } else {
      bracket.initBracketWithTeams(shuffle(teams));
    }
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

  return (
    <div>
      <PlayOffsCreateMenu
        toggleCreate={toggleCreate}
        maxRounds={maxRounds()}
        options={options}
        setRounds={setRounds}
        setPlaceMatchesQtt={setPlaceMatchesQtt}
        setAutoTeams={setAutoTeams}
        submitBracket={submitBracket}
      />
      <PlayOffsCreateBracketMock
        placeMatches={bracket.placeMatches}
        handleOpenTeams={handleOpenTeams}
      />
      {game ? (
        <Choose
          open={openTeams}
          bracket={bracket}
          handleClose={handleCloseTeams}
          teams={teams}
          groups={groups}
          game={game}
          chosenTeams={chosenTeams}
          setChosenTeams={setChosenTeams}
          chosenPromoted={chosenPromoted}
          setChosenPromoted={setChosenPromoted}
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
