import React, { ChangeEvent, useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Rosetta, Translator } from "react-rosetta";

import { Button } from "@material-ui/core";

import { AddTeamFormStyled } from "../../styled/styledTeams";
import { addTeamToTournament } from "../../store/actions/TeamActions";
import { Id } from "../../const/structuresConst";
import { AddTeamTextFieldStyled } from "../../styled/styledForm";
import AddLogo from "../tournaments/create/AddLogo";
import { TeamCreateData } from "../../models/teamData";
import { LOCALE } from "../../locale/config";
import tournamentDetailsDict from "../../locale/tournamentDetails";

type Props = {
  addTeamToTournament: (
    tournamentId: Id,
    team: TeamCreateData,
    image: any
  ) => void;
  handleClose: () => void;
  locale: LOCALE;
};

const AddTeam: React.FC<Props> = ({
  addTeamToTournament,
  handleClose,
  locale,
}) => {
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
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
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
          helperText={
            errors.name && <Translator id="nameRequired" />
          }
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
          <Translator id="addTeam" />
        </Button>
      </AddTeamFormStyled>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTeamToTournament: (tournamentId: Id, team: TeamCreateData, image: any) =>
      dispatch(addTeamToTournament(tournamentId, team, image)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTeam);
