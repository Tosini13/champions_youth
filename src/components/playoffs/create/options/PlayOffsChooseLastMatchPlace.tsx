import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";

import { BracketNavSelectStyled } from "../../../../styled/styledBracket";
import { Options } from "../../../../structures/bracket";
import tournamentDetailsDict from "../../../../locale/tournamentDetails";
import { SelectStyled } from "../../../../styled/styledForm";
import { style } from "./PlayOffsChooseRound";
import { useLocale } from "../../../../Provider/LocaleProvider";

type Props = {
  options: Options;
  setPlaceMatchesQtt: (placeMatchesQtt: number) => void;
};

const PlayOffsChooseLastMatchPlace: React.FC<Props> = ({
  options,
  setPlaceMatchesQtt,
}) => {
  const { locale } = useLocale();
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
        <FormLabel component="legend" style={style.legend}>
          <Translator id="placeMatches" />
        </FormLabel>
        <FormControlLabel
          color="secondary"
          label=""
          labelPlacement="start"
          control={
            <SelectStyled
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
            </SelectStyled>
          }
        />
      </BracketNavSelectStyled>
    </Rosetta>
  );
};

export default PlayOffsChooseLastMatchPlace;
