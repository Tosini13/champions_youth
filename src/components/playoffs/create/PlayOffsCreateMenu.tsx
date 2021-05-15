import React from "react";
import { Options } from "../../../structures/bracket";
import { connect } from "react-redux";
import { Rosetta, Translator } from "react-rosetta";

import { ButtonHorizontalContainerStyled } from "../../../styled/styledButtons";
import PlayOffsChooseLastMatchPlace from "./options/PlayOffsChooseLastMatchPlace";
import PlayOffsChooseRound from "./options/PlayOffsChooseRound";
import { LOCALE } from "../../../locale/config";
import tournamentDetailsDict from "../../../locale/tournamentDetails";
import { ButtonRC } from "../../../styled/styledComponents/styledButtons";

type Props = {
  toggleCreate: () => void;
  options: Options;
  maxRounds: number;
  setRounds: (rounds: number) => void;
  setPlaceMatchesQtt: (placeMatchesQtt: number) => void;
  setAutoTeams: () => void;
  submitBracket: () => void;
  locale: LOCALE;
};

const PlayOffsCreateMenu: React.FC<Props> = ({
  toggleCreate,
  options,
  setRounds,
  setPlaceMatchesQtt,
  setAutoTeams,
  submitBracket,
  maxRounds,
  locale,
}) => {
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
        <ButtonRC onClick={setAutoTeams}>
          <Translator id="draw" />
        </ButtonRC>
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

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(PlayOffsCreateMenu);
