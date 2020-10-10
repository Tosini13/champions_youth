import React, { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import { IconButtonStyled } from "../../styled/styledButtons";
import { AddTeamFormStyled } from "../../styled/styledTeams";
import { addTeamToTournament } from "../../store/actions/TeamActions";
import { Id } from "../../const/structuresConst";
import { TeamCreateData } from "../../models/teamData";
import { AddTeamTextFieldStyled } from "../../styled/styledForm";
import { AddIconStyled } from "../../styled/styledIcons";

type Props = {
  tournamentId: Id;
  addTeamToTournament: (tournamentId: Id, team: TeamCreateData) => void;
};

const AddTeam: React.FC<Props> = ({ tournamentId, addTeamToTournament }) => {
  const { handleSubmit, register, errors } = useForm();

  const [name, setName] = useState<string>("");

  const handleChange = (
    value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(value.currentTarget.value);
  };

  const onSubmit = (data: any) => {
    const team: TeamCreateData = {
      name,
    };
    setName("");
    addTeamToTournament(tournamentId, team);
  };

  return (
    <>
      <AddTeamFormStyled onSubmit={handleSubmit(onSubmit)}>
        <IconButtonStyled style={{ marginRight: "10px" }}>
          <AddAPhotoIcon fontSize="small" color="secondary" />
        </IconButtonStyled>
        <AddTeamTextFieldStyled
          label="Nazwa"
          color="secondary"
          onChange={handleChange}
          value={name}
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
          <AddIconStyled />
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
