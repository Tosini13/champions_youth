import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import moment from "moment";

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

type Props = {
  createTournament: (data: TournamentCreateData) => void;
};

const CreateTournament: React.FC<Props> = ({ createTournament }) => {
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values: any) => {
    console.log(values);
    // const data: TournamentCreateData = {
    //   name: values.name,
    //   date: values.date,
    // };
    // createTournament(data);
    // history.push(routerConstString.tournaments);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <CreateTournamentBasicInfo register={register} errors={errors} />
        );
      case 1:
        return <CreateTournamentLocation register={register} errors={errors} />;
      case 2:
        return (
          <CreateTournamentMatchesInfo register={register} errors={errors} />
        );
      case 3:
        return (
          <FormGroup>
            <Button
              variant="outlined"
              color="secondary"
              type="submit"
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
      <VerticalStepper getStepContent={getStepContent} />
    </FormStyled>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createTournament: (data: TournamentCreateData) =>
      dispatch(createTournament(data)),
  };
};
export default connect(null, mapDispatchToProps)(CreateTournament);
