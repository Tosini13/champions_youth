import React, { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Button } from "@material-ui/core";

import { AddTeamFormStyled } from "../../styled/styledTeams";
import { addTeamToTournament } from "../../store/actions/TeamActions";
import { Id } from "../../const/structuresConst";
import { AddTeamTextFieldStyled } from "../../styled/styledForm";
import AddLogo from "../tournaments/create/AddLogo";
import { TeamCreateData } from "../../models/teamData";

type Props = {
  addTeamToTournament: (
    tournamentId: Id,
    team: TeamCreateData,
    image: any
  ) => void;
  handleClose: () => void;
};

const AddTeam: React.FC<Props> = ({ addTeamToTournament, handleClose }) => {
  const { handleSubmit, register, errors } = useForm();
  const { tournamentId } = useParams<{ tournamentId: Id }>();

  const [image, setImage] = useState<any | null>(null);
  const [name, setName] = useState<string>("");

  const handleChange = (
    value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(value.currentTarget.value);
  };

  const onSubmit = (data: any) => {
    const team: TeamCreateData = {
      name,
      logo: image ? image.name : undefined,
    };
    setName("");
    handleClose();
    addTeamToTournament(tournamentId, team, image);
  };

  return (
    <AddTeamFormStyled onSubmit={handleSubmit(onSubmit)}>
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
        helperText={errors.name && "Nazwa musi zawierać przynajmniej 2 znaki!"}
        error={Boolean(errors.name)}
      />
      {errors.username && errors.username.message}
      <AddLogo image={image} setImage={setImage} />
      <Button
        variant="outlined"
        color="secondary"
        type="submit"
        style={{ margin: "15px auto", width: "fit-content" }}
      >
        Dodaj
      </Button>
    </AddTeamFormStyled>
  );
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTeamToTournament: (tournamentId: Id, team: TeamCreateData, image: any) =>
      dispatch(addTeamToTournament(tournamentId, team, image)),
  };
};

export default connect(null, mapDispatchToProps)(AddTeam);
