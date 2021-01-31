import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Rosetta, Translator } from "react-rosetta";

import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";

import { routerConstString } from "../../../const/menuConst";
import { createTournament } from "../../../store/actions/TournamentActions";
import { TournamentCreateData } from "../../../models/tournamentData";
import { FormStyled } from "../../../styled/styledForm";
import CreateTournamentBasicInfo from "./BasicInfo";
import CreateTournamentLocation from "./Location";
import VerticalStepper from "./VerticalStepper";
import { setBack } from "../../../store/actions/MenuActions";
import AddLogo from "./AddLogo";
import { LOCALE } from "../../../locale/config";
import createTournamentDict from "../../../locale/createTournament.dict";

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
  setBack: (route: routerConstString) => void;
  locale: LOCALE;
};

const CreateTournament: React.FC<Props> = ({
  createTournament,
  setBack,
  locale,
}) => {
  const history = useHistory();
  const { handleSubmit, register, errors, trigger } = useForm<FormModel>();

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
    name: "",
    date: moment(),
  });

  const [image, setImage] = useState<any | null>(null);

  const [location, setLocation] = useState<LocationDataForm>({
    city: "",
    address: "",
  });

  const onCreate = () => {
    const data: TournamentCreateData = {
      name: basicInfo.name,
      date: basicInfo.date ? basicInfo.date.format() : moment().format(),
      city: location.city,
      address: location.address,
      fields: 3,
    };
    createTournament(data, image);
    history.push(routerConstString.tournaments);
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
            <AddLogo image={image} setImage={setImage} />
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
              <Button
                variant="outlined"
                color="secondary"
                type="submit"
                onClick={onCreate}
                style={{ margin: "5px auto" }}
              >
                <Translator id="create" />
              </Button>
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
    setBack: (route: routerConstString) => dispatch(setBack(route)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateTournament);
