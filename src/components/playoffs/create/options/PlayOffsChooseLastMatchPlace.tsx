import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";

import { BracketNavSelectStyled } from "../../../../styled/styledBracket";
import { Options } from "../../../../structures/bracket";
import tournamentDetailsDict from "../../../../locale/tournamentDetails";
import {
  FormLabelRC,
  SelectRU,
} from "../../../../styled/styledComponents/styledForm";
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
        <FormLabelRC>
          <Translator id="placeMatches" />
        </FormLabelRC>
        <FormControlLabel
          color="secondary"
          label=""
          labelPlacement="start"
          control={
            <SelectRU
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
            </SelectRU>
          }
        />
      </BracketNavSelectStyled>
    </Rosetta>
  );
};

export default PlayOffsChooseLastMatchPlace;
