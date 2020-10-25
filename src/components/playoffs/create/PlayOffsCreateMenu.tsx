import React from "react";
import { Options } from "../../../structures/bracket";

import {
  ButtonErrorStyled,
  ButtonHorizontalContainerStyled,
  ButtonSuccessStyled,
} from "../../../styled/styledButtons";
import PlayOffsChooseLastMatchPlace from "./PlayOffsChooseLastMatchPlace";
import PlayOffsChooseRound from "./PlayOffsChooseRound";

type Props = {
  toggleCreate: () => void;
  options: Options;
  maxRounds: number;
  setRounds: (rounds: number) => void;
  setPlaceMatchesQtt: (placeMatchesQtt: number) => void;
  submitBracket: () => void;
};

const PlayOffsCreateMenu: React.FC<Props> = ({
  toggleCreate,
  options,
  setRounds,
  setPlaceMatchesQtt,
  submitBracket,
  maxRounds,
}) => {
  return (
    <>
      <ButtonHorizontalContainerStyled>
        <ButtonErrorStyled
          variant="outlined"
          color="secondary"
          onClick={toggleCreate}
        >
          Anuluj
        </ButtonErrorStyled>
        <ButtonSuccessStyled
          variant="outlined"
          color="secondary"
          onClick={submitBracket}
        >
          Stwórz
        </ButtonSuccessStyled>
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
  );
};

export default PlayOffsCreateMenu;
