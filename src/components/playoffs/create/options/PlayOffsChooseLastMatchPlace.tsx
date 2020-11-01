import React from "react";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { BracketNavSelectStyled } from "../../../../styled/styledBracket";
import { Options } from "../../../../structures/bracket";
import { LOCALE } from "../../../../locale/config";
import tournamentDetailsDict from "../../../../locale/tournamentDetails";

type Props = {
  options: Options;
  setPlaceMatchesQtt: (placeMatchesQtt: number) => void;
  locale: LOCALE;
};

const PlayOffsChooseLastMatchPlace: React.FC<Props> = ({
  options,
  setPlaceMatchesQtt,
  locale,
}) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const placeMatchesQtt = event.target.value as number;
    if (options.rounds && placeMatchesQtt < options.rounds * 2) {
      setPlaceMatchesQtt(event.target.value as number);
    }
  };

  let places: number[] = [];
  if (options.rounds) {
    for (let i = 1; i < options.rounds * 2; i += 2) {
      places.push(i);
    }
  }
  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <BracketNavSelectStyled row>
        <FormLabel component="legend">
          <Translator id="placeMatches" />
        </FormLabel>
        <FormControlLabel
          label=""
          labelPlacement="start"
          control={
            <Select
              color="secondary"
              value={options.placeMatchesQtt}
              onChange={handleChange}
            >
              {places.map((place) => {
                return (
                  <MenuItem key={place} value={place}>
                    {place}
                  </MenuItem>
                );
              })}
            </Select>
          }
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

export default connect(mapStateToProps)(PlayOffsChooseLastMatchPlace);
