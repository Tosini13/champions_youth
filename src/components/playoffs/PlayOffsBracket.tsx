import React from "react";
import { Game } from "../../models/gameData";
import PlayOffsBracketGame from "./PlayOffsBracketGame";

type Props = {
  playOffs: Game[];
};

const PlayOffsBracket: React.FC<Props> = ({ playOffs }) => {
  return (
    <>
      {playOffs.map((game) => (
        <PlayOffsBracketGame key={game.id} game={game} />
      ))}
    </>
  );
};

export default PlayOffsBracket;