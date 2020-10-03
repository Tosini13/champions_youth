import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import moment from "moment";

import TextField from "@material-ui/core/TextField";

import { routerConstString } from "../../const/menuConst";
import { createTournament } from "../../store/actions/TournamentActions";
import { TournamentCreateData } from "../../models/tournamentData";

type Props = {
  createTournament: (data: TournamentCreateData) => void;
};

const CreateTournament: React.FC<Props> = ({ createTournament }) => {
  const history = useHistory();
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (values: any) => {
    const data: TournamentCreateData = {
      name: values.name,
      date: moment().format(),
    };
    createTournament(data);
    history.push(routerConstString.tournaments);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Title"
        inputProps={{
          name: "name",
          ref: register({ required: "Required", maxLength: 255, minLength: 2 }),
        }}
        helperText={errors.name && "Title must have at least 2 signs!"}
        error={Boolean(errors.name)}
      />
      ;{errors.username && errors.username.message}
      <button type="submit">Create</button>
    </form>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createTournament: (data: TournamentCreateData) =>
      dispatch(createTournament(data)),
  };
};
export default connect(null, mapDispatchToProps)(CreateTournament);
