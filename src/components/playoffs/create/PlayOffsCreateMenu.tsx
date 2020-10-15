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
  setRounds: (rounds: number) => void;
  setPlaceMatchesQtt: (placeMatchesQtt: number) => void;
  toggleRoundsActive: () => void;
  submitBracket: () => void;
};

const PlayOffsCreateMenu: React.FC<Props> = ({
  toggleCreate,
  options,
  setRounds,
  setPlaceMatchesQtt,
  submitBracket,
  toggleRoundsActive,
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
        options={options}
        setRounds={setRounds}
        toggleRoundsActive={toggleRoundsActive}
      />
    </>
  );
};

export default PlayOffsCreateMenu;
