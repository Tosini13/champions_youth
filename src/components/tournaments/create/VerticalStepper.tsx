import React from "react";

import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";

import {
  TournamentCreationStepLabelStyled,
  TournamentCreationStepperStyled,
} from "../../../styled/styledForm";
import { ColorlibStepIcon } from "./StepperBullet";

function getSteps() {
  return [
    "Informacje o turnieju",
    "Informacje o meczach",
    "Lokalizacja turnieju",
    "Podsumowanie",
  ];
}

type Props = {
  getStepContent: (step: number) => JSX.Element | "Unknown step";
};

const VerticalStepper: React.FC<Props> = ({ getStepContent }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleSetStep = (step: number) => {
    setActiveStep(step);
  };

  return (
    <>
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
              <TournamentCreationStepLabelStyled>
                {label}
              </TournamentCreationStepLabelStyled>
            </StepLabel>
            <StepContent>{getStepContent(index)}</StepContent>
          </Step>
        ))}
      </TournamentCreationStepperStyled>
    </>
  );
};

export default VerticalStepper;
