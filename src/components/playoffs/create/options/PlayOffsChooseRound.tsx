import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";

import { BracketNavSelectStyled } from "../../../../styled/styledBracket";
import { roundMatchesTitle } from "../../../../const/structuresConst";
import { Options } from "../../../../structures/bracket";
import tournamentDetailsDict from "../../../../locale/tournamentDetails";
import useTranslationHelp from "../../../../hooks/useTranslationHelp";
import {
  FormLabelRC,
  SelectRU,
} from "../../../../styled/styledComponents/styledForm";
import { useLocale } from "../../../../Provider/LocaleProvider";

export const style = {
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
  const { locale } = useLocale();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const rounds = event.target.value as number;
    setRounds(rounds);
  };

  const { translateRound } = useTranslationHelp();

  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <BracketNavSelectStyled row>
        <FormLabelRC>
          <Translator id="rounds" />
        </FormLabelRC>
        <FormControlLabel
          style={style.formControlLabel}
          control={
            <SelectRU
              style={style.select}
              color="secondary"
              value={options.rounds}
              onChange={handleChange}
            >
              {Array.from(roundMatchesTitle.keys()).map((round) => {
                if (maxRounds >= round) {
                  const { round: roundName } = translateRound(
                    roundMatchesTitle.get(round)
                  );
                  return (
                    <MenuItem key={round} value={round}>
                      <Translator id={roundName} />
                    </MenuItem>
                  );
                } else {
                  return null;
                }
              })}
            </SelectRU>
          }
          label=""
          labelPlacement="start"
        />
      </BracketNavSelectStyled>
    </Rosetta>
  );
};
export default PlayOffsChooseRound;
