import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";

import {
  TournamentCreationStepLabelStyled,
  TournamentCreationStepperStyled,
} from "../../../styled/styledForm";
import { ColorlibStepIcon } from "./StepperBullet";
import { LOCALE } from "../../../locale/config";
import createTournamentDict from "../../../locale/createTournament.dict";

function getSteps() {
  return ["basicInfo", "locationInfo", "summary"];
}

type Props = {
  getStepContent: (step: number) => JSX.Element | "Unknown step";
  errors: any;
  handleTrigger: () => Promise<void>;
  locale: LOCALE;
};

const VerticalStepper: React.FC<Props> = ({
  getStepContent,
  errors,
  handleTrigger,
  locale,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleSetStep = async (step: number) => {
    await handleTrigger();
    if (Object.keys(errors).length === 0) {
      setActiveStep(step);
    }
  };

  return (
    <Rosetta translations={createTournamentDict} locale={locale}>
      <TournamentCreationStepperStyled
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              onClick={() => {
                handleSetStep(index);
              }}
            >
              <TournamentCreationStepLabelStyled type="submit">
                <Translator id={`${label}`} />
              </TournamentCreationStepLabelStyled>
            </StepLabel>
            <StepContent>{getStepContent(index)}</StepContent>
          </Step>
        ))}
      </TournamentCreationStepperStyled>
    </Rosetta>
  );
};

export default VerticalStepper;
