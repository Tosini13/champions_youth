import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";

import { routerConstString } from "../../../const/menuConst";
import { createTournament } from "../../../store/actions/TournamentActions";
import { TournamentCreateData } from "../../../models/tournamentData";
import { FormStyled } from "../../../styled/styledForm";
import CreateTournamentBasicInfo from "./BasicInfo";
import CreateTournamentLocation from "./Location";
import CreateTournamentMatchesInfo from "./MatchesInfo";
import VerticalStepper from "./VerticalStepper";
import { setBack } from "../../../store/actions/MenuActions";

export type BasicInfoDataForm = {
  name: string;
  date: MaterialUiPickersDate;
};

export type LocationDataForm = {
  city: string;
  address: string;
};

export type MatchesInfoForm = {
  disabled: boolean;
  matchTimeInGroup: number;
  breakTimeInGroup: number;
  matchTimeInBracket: number;
  breakTimeInBracket: number;
};

type Props = {
  createTournament: (data: TournamentCreateData) => void;
  setBack: (route: routerConstString) => void;
};

const CreateTournament: React.FC<Props> = ({ createTournament, setBack }) => {
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();

  useEffect(() => {
    setBack(routerConstString.tournaments);
  }, [setBack]);

  const [basicInfo, setBasicInfo] = useState<BasicInfoDataForm>({
    name: "",
    date: moment(),
  });
  const [location, setLocation] = useState<LocationDataForm>({
    city: "",
    address: "",
  });
  const [matchesInfo, setMatchesInfo] = useState<MatchesInfoForm>({
    disabled: true,
    matchTimeInGroup: 5,
    breakTimeInGroup: 1,
    matchTimeInBracket: 6,
    breakTimeInBracket: 2,
  });

  const onSubmit = () => {
    console.log("check!");
  };

  const onCreate = () => {
    const data: TournamentCreateData = {
      name: basicInfo.name,
      date: basicInfo.date ? basicInfo.date.format() : moment().format(),
      city: location.city,
      address: location.address,
      matchTimeInGroup: matchesInfo.matchTimeInGroup,
      breakTimeInGroup: matchesInfo.breakTimeInGroup,
      matchTimeInBracket: matchesInfo.matchTimeInBracket,
      breakTimeInBracket: matchesInfo.breakTimeInBracket,
    };
    createTournament(data);
    history.push(routerConstString.tournaments);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CreateTournamentBasicInfo
            register={register}
            errors={errors}
            basicInfo={basicInfo}
            setBasicInfo={setBasicInfo}
          />
        );
      case 1:
        return (
          <CreateTournamentLocation
            register={register}
            errors={errors}
            location={location}
            setLocation={setLocation}
          />
        );
      case 2:
        return (
          <CreateTournamentMatchesInfo
            register={register}
            errors={errors}
            matchesInfo={matchesInfo}
            setMatchesInfo={setMatchesInfo}
          />
        );
      case 3:
        return (
          <FormGroup>
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
              onClick={onCreate}
              style={{ margin: "5px auto" }}
            >
              Stwórz
            </Button>
          </FormGroup>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      <VerticalStepper getStepContent={getStepContent} errors={errors} />
    </FormStyled>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createTournament: (data: TournamentCreateData) =>
      dispatch(createTournament(data)),
    setBack: (route: routerConstString) => dispatch(setBack(route)),
  };
};
export default connect(null, mapDispatchToProps)(CreateTournament);
