import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

import AddIcon from "@material-ui/icons/Add";

import { IconButtonStyled } from "../../styled/styledButtons";
import {
  AddTeamFormStyled,
  AddTeamTextFieldStyled,
} from "../../styled/styledTeams";
import { addTeamToTournament } from "../../store/actions/TeamActions";
import { Id } from "../../const/structuresConst";
import { TeamCreateData } from "../../models/teamData";

type Props = {
  tournamentId: Id;
  addTeamToTournament: (tournamentId: Id, team: TeamCreateData) => void;
};

const AddTeam: React.FC<Props> = ({ tournamentId, addTeamToTournament }) => {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (data: any) => {
    const team: TeamCreateData = {
      name: data.name,
    };
    addTeamToTournament(tournamentId, team);
  };

  return (
    <>
      <AddTeamFormStyled onSubmit={handleSubmit(onSubmit)}>
        <AddTeamTextFieldStyled
          label="Nazwa"
          color="secondary"
          inputProps={{
            name: "name",
            ref: register({
              required: "Required",
              maxLength: 255,
            }),
          }}
          helperText={
            errors.name && "Nazwa musi zawierać przynajmniej 2 znaki!"
          }
          error={Boolean(errors.name)}
        />
        {errors.username && errors.username.message}
        <IconButtonStyled aria-label="add" type="submit">
          <AddIcon />
        </IconButtonStyled>
      </AddTeamFormStyled>
    </>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTeamToTournament: (tournamentId: Id, team: TeamCreateData) =>
      dispatch(addTeamToTournament(tournamentId, team)),
  };
};
export default connect(null, mapDispatchToProps)(AddTeam);
