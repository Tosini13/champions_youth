import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";

import { BracketNavSelectStyled } from "../../../../styled/styledBracket";
import { roundMatchesTitle } from "../../../../const/structuresConst";
import { Options } from "../../../../structures/bracket";
import tournamentDetailsDict from "../../../../locale/tournamentDetails";
import useTranslationHelp from "../../../../hooks/useTranslationHelp";
import { SelectStyled } from "../../../../styled/styledForm";
import { mainTheme } from "../../../../styled/styledConst";
import { useLocale } from "../../../../Provider/LocaleProvider";

export const style = {
  formControlLabel: {
    flexGrow: 1,
  },
  select: {
    width: "100%",
  },
  legend: {
    color: mainTheme.palette.secondary.main,
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
        <FormLabel component="legend" style={style.legend}>
          <Translator id="rounds" />
        </FormLabel>
        <FormControlLabel
          style={style.formControlLabel}
          control={
            <SelectStyled
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
            </SelectStyled>
          }
          label=""
          labelPlacement="start"
        />
      </BracketNavSelectStyled>
    </Rosetta>
  );
};
export default PlayOffsChooseRound;
