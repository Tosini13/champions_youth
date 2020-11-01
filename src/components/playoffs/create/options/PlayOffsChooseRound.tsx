import React from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { BracketNavSelectStyled } from "../../../../styled/styledBracket";
import { roundMatchesTitle } from "../../../../const/structuresConst";
import { Options } from "../../../../structures/bracket";
import { LOCALE } from "../../../../locale/config";
import tournamentDetailsDict from "../../../../locale/tournamentDetails";

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
  locale: LOCALE;
};

const PlayOffsChooseRound: React.FC<Props> = ({
  maxRounds,
  options,
  setRounds,
  locale
}) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const rounds = event.target.value as number;
    setRounds(rounds);
  };

  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <BracketNavSelectStyled row>
        <FormLabel component="legend"><Translator id="rounds" /></FormLabel>
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
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(PlayOffsChooseRound);
