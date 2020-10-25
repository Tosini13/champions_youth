import React from "react";

import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { BracketNavSelectStyled } from "../../../styled/styledBracket";
import { roundMatchesTitle } from "../../../const/structuresConst";
import { Options } from "../../../structures/bracket";

const style = {
  formControlLabel: {
    flexGrow: 1,
  },
  select: {
    width: "100%",
  },
};

type Props = {
  maxRounds: number;
  options: Options;
  setRounds: (rounds: number) => void;
};

const PlayOffsChooseRound: React.FC<Props> = ({
  maxRounds,
  options,
  setRounds,
}) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const rounds = event.target.value as number;
    setRounds(rounds);
  };

  return (
    <BracketNavSelectStyled row>
      <FormLabel component="legend">Rounds:</FormLabel>
      <FormControlLabel
        style={style.formControlLabel}
        control={
          <Select
            style={style.select}
            color="secondary"
            value={options.rounds}
            onChange={handleChange}
          >
            {Array.from(roundMatchesTitle.keys()).map((round) => {
              if (maxRounds >= round) {
                return (
                  <MenuItem key={round} value={round}>
                    {roundMatchesTitle.get(round)}
                  </MenuItem>
                );
              } else {
                return null;
              }
            })}
          </Select>
        }
        label=""
        labelPlacement="start"
      />
    </BracketNavSelectStyled>
  );
};

export default PlayOffsChooseRound;
