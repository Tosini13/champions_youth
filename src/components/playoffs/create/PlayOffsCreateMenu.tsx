import React from "react";
import { Options } from "../../../structures/bracket";
import { Rosetta, Translator } from "react-rosetta";

import { ButtonHorizontalContainerStyled } from "../../../styled/styledButtons";
import PlayOffsChooseLastMatchPlace from "./options/PlayOffsChooseLastMatchPlace";
import PlayOffsChooseRound from "./options/PlayOffsChooseRound";
import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { ButtonRC } from "../../../styled/styledComponents/styledButtons";
import { useLocale } from "../../../Provider/LocaleProvider";

type Props = {
  toggleCreate: () => void;
  options: Options;
  maxRounds: number;
  setRounds: (rounds: number) => void;
  setPlaceMatchesQtt: (placeMatchesQtt: number) => void;
  setAutoTeams: () => void;
  submitBracket: () => void;
};

const PlayOffsCreateMenu: React.FC<Props> = ({
  toggleCreate,
  options,
  setRounds,
  setPlaceMatchesQtt,
  setAutoTeams,
  submitBracket,
  maxRounds,
}) => {
  const { locale } = useLocale();
  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <>
        <ButtonHorizontalContainerStyled>
          <ButtonRC onClick={toggleCreate}>
            <Translator id="cancel" />
          </ButtonRC>
          <ButtonRC onClick={submitBracket}>
            <Translator id="create" />
          </ButtonRC>
        </ButtonHorizontalContainerStyled>
        <ButtonHorizontalContainerStyled>
          <ButtonRC onClick={setAutoTeams}>
            <Translator id="draw" />
          </ButtonRC>
        </ButtonHorizontalContainerStyled>
        <PlayOffsChooseLastMatchPlace
          options={options}
          setPlaceMatchesQtt={setPlaceMatchesQtt}
        />
        <PlayOffsChooseRound
          maxRounds={maxRounds}
          options={options}
          setRounds={setRounds}
        />
      </>
    </Rosetta>
  );
};

export default PlayOffsCreateMenu;
