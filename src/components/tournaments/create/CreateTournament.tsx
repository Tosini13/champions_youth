import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Rosetta, Translator } from "react-rosetta";

import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import FormGroup from "@material-ui/core/FormGroup";

import {
  routerConstString,
  routerGenerateConst,
} from "../../../const/menuConst";
import {
  createTournament,
  TupdateTournament,
  updateTournament,
} from "../../../store/actions/TournamentActions";
import {
  TournamentCreateData,
  TournamentData,
} from "../../../models/tournamentData";
import { FormStyled } from "../../../styled/styledForm";
import CreateTournamentBasicInfo from "./BasicInfo";
import CreateTournamentLocation from "./Location";
import VerticalStepper from "./VerticalStepper";
import { setBack } from "../../../store/actions/MenuActions";
import AddLogo from "./AddLogo";
import { LOCALE } from "../../../locale/config";
import createTournamentDict from "../../../locale/createTournament.dict";
import { getImage, getImageJustUploaded } from "../actions/getImage";
import { ButtonRC } from "../../../styled/styledComponents/styledButtons";

export type BasicInfoDataForm = {
  name: string;
  date: MaterialUiPickersDate;
};

export type LocationDataForm = {
  city: string;
  address: string;
};

type FormModel = BasicInfoDataForm & LocationDataForm;

type Props = {
  createTournament: (data: TournamentCreateData, image?: any) => void;
  updateTournament: (data: TupdateTournament) => void;
  setBack: (route: routerConstString) => void;
  locale: LOCALE;
  tournamentData?: TournamentData;
};

const CreateTournament: React.FC<Props> = ({
  createTournament,
  updateTournament,
  setBack,
  locale,
  tournamentData,
}) => {
  const history = useHistory();
  const { handleSubmit, register, errors, trigger } = useForm<FormModel>({
    defaultValues: tournamentData
      ? {
          name: tournamentData.name,
          date: moment(tournamentData.date),
          city: tournamentData.city,
          address: tournamentData.address,
        }
      : {},
  });

  const [currentInputs, setCurrentInputs] = useState<
    string | string[] | undefined
  >();

  const handleTrigger = async () => {
    await trigger(currentInputs);
  };

  useEffect(() => {
    setBack(routerConstString.tournaments);
  }, [setBack]);

  const [basicInfo, setBasicInfo] = useState<BasicInfoDataForm>({
    name: tournamentData?.name ?? "",
    date: tournamentData?.date ? moment(tournamentData.date) : moment(),
  });

  const [oldImage, setOldImage] = useState<string | undefined>(
    tournamentData?.image
  );
  const [image, setImage] = useState<any | null>(null);

  useEffect(() => {
    if (tournamentData?.image && tournamentData.id && tournamentData.ownerId) {
      getImage(tournamentData.image, tournamentData.id)
        .then((image) => {
          let img = image;
          if (!image && tournamentData.image) {
            img =
              getImageJustUploaded(
                tournamentData.image,
                tournamentData.ownerId
              ) ?? undefined;
          }
          console.log(img);
          setOldImage(img);
        })
        .catch((err) => console.log("err", err));
    }
  }, [tournamentData]);

  const [location, setLocation] = useState<LocationDataForm>({
    city: tournamentData?.city ?? "",
    address: tournamentData?.address ?? "",
  });

  const onCreate = () => {
    const data: TournamentCreateData = {
      name: basicInfo.name,
      date: basicInfo.date ? basicInfo.date.format() : moment().format(),
      city: location.city,
      address: location.address,
      fields: 3,
      image: tournamentData?.image,
    };
    if (tournamentData) {
      updateTournament({
        data,
        tournamentId: tournamentData.id,
        image,
        oldImage,
      });
      history.push(routerGenerateConst.tournament(tournamentData.id));
    } else {
      createTournament(data, image);
      history.push(routerConstString.tournaments);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <CreateTournamentBasicInfo
              locale={locale}
              register={register}
              errors={errors}
              basicInfo={basicInfo}
              setBasicInfo={setBasicInfo}
              setCurrentInputs={setCurrentInputs}
            />
            <AddLogo
              oldImage={oldImage}
              deleteOldImage={() => setOldImage(undefined)}
              image={image}
              setImage={setImage}
            />
          </>
        );
      case 1:
        return (
          <CreateTournamentLocation
            locale={locale}
            register={register}
            errors={errors}
            location={location}
            setLocation={setLocation}
          />
        );
      case 2:
        return (
          <Rosetta translations={createTournamentDict} locale={locale}>
            <FormGroup>
              <ButtonRC
                type="submit"
                onClick={onCreate}
                style={{ margin: "5px auto" }}
              >
                <Translator id="create" />
              </ButtonRC>
            </FormGroup>
          </Rosetta>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit(() => {})}>
      <VerticalStepper
        locale={locale}
        getStepContent={getStepContent}
        errors={errors}
        handleTrigger={handleTrigger}
      />
    </FormStyled>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createTournament: (data: TournamentCreateData, image?: any) =>
      dispatch(createTournament(data, image)),
    updateTournament: (data: TupdateTournament) =>
      dispatch(updateTournament(data)),
    setBack: (route: routerConstString) => dispatch(setBack(route)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateTournament);
