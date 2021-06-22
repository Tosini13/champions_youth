import React, { ChangeEvent, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Rosetta, Translator } from "react-rosetta";

import { AddTeamFormStyled } from "../../styled/styledTeams";
import {
  addTeamToTournament,
  editTeamFromTournament,
  TEditTeam,
} from "../../store/actions/TeamActions";
import { Id } from "../../const/structuresConst";
import { AddTeamTextFieldStyled } from "../../styled/styledComponents/styledForm";
import AddLogo from "../tournaments/create/AddLogo";
import { TeamCreateData, TeamData } from "../../models/teamData";
import tournamentDetailsDict from "../../locale/tournamentDetails";
import { ButtonRC } from "../../styled/styledComponents/styledButtons";
import { useLocale } from "../../Provider/LocaleProvider";
import {
  getImage,
  getImageJustUploaded,
} from "../tournaments/actions/getImage";

type Props = {
  selectedTeam?: TeamData;
  addTeamToTournament: (
    tournamentId: Id,
    team: TeamCreateData,
    image: any
  ) => void;
  editTeamFromTournament: (data: TEditTeam) => void;
  handleClose: () => void;
};

const TeamForm: React.FC<Props> = ({
  addTeamToTournament,
  editTeamFromTournament,
  handleClose,
  selectedTeam,
}) => {
  const { locale } = useLocale();
  const { handleSubmit, register, errors } = useForm();
  const { tournamentId } = useParams<{ tournamentId: Id }>();

  const [oldImage, setOldImage] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<any | null>(null);
  const [name, setName] = useState<string>("");

  const handleChange = (
    value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setName(value.currentTarget.value);
  };

  const clearForm = () => {
    setName("");
    setImage(undefined);
    setOldImage(undefined);
  };

  const onSubmit = (data: any) => {
    if (selectedTeam) {
      const team: Omit<TeamData, "id"> = {
        name,
        logo: selectedTeam.logo,
      };
      editTeamFromTournament({
        tournamentId,
        teamId: selectedTeam.id,
        team,
        newLogo: image,
        oldLogo: oldImage,
      });
    } else {
      const team: TeamCreateData = {
        name,
        logo: image ? image.name : undefined,
      };
      addTeamToTournament(tournamentId, team, image);
    }
    clearForm();
    handleClose();
  };

  useEffect(() => {
    if (selectedTeam) {
      setName(selectedTeam.name);
    }
    if (selectedTeam && selectedTeam.logo) {
      getImage(selectedTeam.logo, tournamentId)
        .then((image) => {
          let img = image;
          if (!image && selectedTeam.logo) {
            img =
              getImageJustUploaded(selectedTeam.logo, tournamentId) ??
              undefined;
          }
          setOldImage(img);
        })
        .catch((err) => console.log("err", err));
    }
  }, [selectedTeam, tournamentId]);

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
          helperText={errors.name && <Translator id="nameRequired" />}
          error={Boolean(errors.name)}
        />
        {errors.username && errors.username.message}
        <AddLogo
          oldImage={oldImage}
          deleteOldImage={() => setOldImage(undefined)}
          image={image}
          setImage={setImage}
        />
        <ButtonRC type="submit" style={{ margin: "15px auto" }}>
          <Translator id="add" />
        </ButtonRC>
      </AddTeamFormStyled>
    </Rosetta>
  );
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addTeamToTournament: (tournamentId: Id, team: TeamCreateData, image: any) =>
      dispatch(addTeamToTournament(tournamentId, team, image)),
    editTeamFromTournament: (data: TEditTeam) =>
      dispatch(editTeamFromTournament(data)),
  };
};

export default connect(null, mapDispatchToProps)(TeamForm);
