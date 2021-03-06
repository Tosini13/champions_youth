import React, { useEffect } from "react";
import { Rosetta, Translator } from "react-rosetta";

import "date-fns";
import MomentUtils from "@date-io/moment";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  KeyboardDatePickerStyled,
  KeyboardTimePickerStyled,
  TextFieldRC,
} from "../../../styled/styledComponents/styledForm";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { BasicInfoDataForm } from "./CreateTournament";
import createTournamentDict from "../../../locale/createTournament.dict";
import { LOCALE } from "../../../locale/config";
import { Grid } from "@material-ui/core";

type Props = {
  register: any;
  errors: any;
  basicInfo: BasicInfoDataForm;
  locale: LOCALE;
  setBasicInfo: (basicInfo: BasicInfoDataForm) => void;
  setCurrentInputs: (name?: string | string[] | undefined) => void;
};

const CreateTournamentBasicInfo: React.FC<Props> = ({
  register,
  errors,
  basicInfo,
  locale,
  setBasicInfo,
  setCurrentInputs,
}) => {
  useEffect(() => {
    setCurrentInputs(["name", "date", "time"]);
  }, [setCurrentInputs]);

  const handleOnChange = (
    element: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBasicInfo({
      ...basicInfo,
      [element.target.name]: element.target.value,
    });
  };

  const handleOnChangeDate = (value: MaterialUiPickersDate) => {
    setBasicInfo({
      ...basicInfo,
      date: value,
    });
  };

  return (
    <Rosetta translations={createTournamentDict} locale={locale}>
      <div style={{ textAlign: "center" }}>
        <TextFieldRC
          label={<Translator id="title" />}
          defaultValue={basicInfo.name}
          onChange={handleOnChange}
          inputProps={{
            name: "name",
            ref: register({
              required: "Required",
              maxLength: 255,
              minLength: 2,
            }),
          }}
          helperText={errors.name && <Translator id="titleError" />}
          error={Boolean(errors.name)}
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid container justify="space-evenly">
            <Grid item>
              <KeyboardDatePickerStyled
                inputProps={{
                  name: "date",
                  ref: register({}),
                }}
                margin="normal"
                label={<Translator id="chooseDate" />}
                format="yyyy-MM-DD"
                value={basicInfo.date}
                onChange={handleOnChangeDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                cancelLabel={<Translator id="cancel" />}
              />
            </Grid>
            <Grid item>
              <KeyboardTimePickerStyled
                inputProps={{
                  name: "time",
                  ref: register({}),
                }}
                margin="normal"
                label={<Translator id="chooseTime" />}
                value={basicInfo.date}
                onChange={handleOnChangeDate}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                cancelLabel={<Translator id="cancel" />}
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    </Rosetta>
  );
};

export default CreateTournamentBasicInfo;
