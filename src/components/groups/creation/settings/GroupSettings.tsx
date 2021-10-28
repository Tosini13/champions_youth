import React, { useEffect, useState } from "react";
import { Rosetta, Translator } from "react-rosetta";

import moment from "moment";

import "date-fns";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import {
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
} from "@material-ui/core";

import {
  TextFieldRC,
  CheckboxStyled,
  KeyboardTimePickerStyled,
  KeyboardDatePickerStyled,
} from "../../../../styled/styledComponents/styledForm";
import groupCreationDict from "../../../../locale/creationNav.dict.";
import { useForm } from "react-hook-form";
import { SettingType } from "../CreateGroupsScreen";
import { DialogRU } from "../../../../styled/styledComponents/navigation/styledDialog";
import { useLocale } from "../../../../Provider/LocaleProvider";
import { ButtonRC } from "../../../../styled/styledComponents/styledButtons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
type TForm = {
  returnMatches: boolean;
  fields: number;
  time: boolean;
  matchTime: number;
  breakTime: number;
  startDate: MaterialUiPickersDate;
  startTime: MaterialUiPickersDate;
};

export interface GroupSettingsProps {
  open: boolean;
  handleClose: () => void;
  settings: SettingType;
  setSettings: (settings: SettingType) => void;
}

const GroupSettings: React.FC<GroupSettingsProps> = ({
  open,
  handleClose,
  settings,
  setSettings,
}) => {
  const { locale } = useLocale();
  const [startDate, setStartDate] = useState<MaterialUiPickersDate>(
    settings.startDate ? moment(settings.startDate) : null
  );
  const { register, errors, handleSubmit, reset, watch, control } =
    useForm<TForm>({});

  useEffect(() => {
    console.log("CHanged settings!!!!!!!!!", settings);
    if (open) {
      reset({
        time: Boolean(settings.time),
        returnMatches: settings.returnMatches,
        matchTime: settings.time?.match ?? 5,
        breakTime: settings.time?.break ?? 2,
        fields: settings.fields,
      });
      setStartDate(settings.startDate ? moment(settings.startDate) : null);
    }
  }, [settings, reset, open]);

  const onSubmit = (values: TForm) => {
    console.log("values", values);
    setSettings({
      ...settings,
      time: values.time
        ? {
            match: values.matchTime,
            break: values.breakTime,
          }
        : undefined,
      returnMatches: values.returnMatches,
      fields: values.fields,
      startDate: startDate ? new Date(moment(startDate).format()) : undefined,
    });
    handleClose();
  };

  const handleCloseAndReset = () => {
    handleClose();
  };

  const timeChecked = watch("time");

  return (
    <DialogRU open={open} onClose={handleCloseAndReset} title={"settings"}>
      <Rosetta translations={groupCreationDict} locale={locale}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DialogContent>
              <Grid container spacing={2} justify="space-evenly">
                <Grid item md={6} sm={8} xs={12}>
                  <KeyboardDatePickerStyled
                    clearable
                    inputProps={{
                      name: "startDate",
                      ref: register({
                        required: timeChecked,
                      }),
                    }}
                    margin="normal"
                    label={<Translator id="chooseDate" />}
                    format="yyyy-MM-DD"
                    value={startDate}
                    onChange={setStartDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    cancelLabel={<Translator id="cancel" />}
                    helperText={
                      errors.startDate && <Translator id="required" />
                    }
                  />
                </Grid>
                <Grid item md={6} sm={8} xs={12}>
                  <KeyboardTimePickerStyled
                    clearable
                    inputProps={{
                      name: "startTime",
                      ref: register({
                        required: timeChecked,
                      }),
                    }}
                    margin="normal"
                    label={<Translator id="chooseTime" />}
                    value={startDate}
                    onChange={setStartDate}
                    KeyboardButtonProps={{
                      "aria-label": "change time",
                    }}
                    cancelLabel={<Translator id="cancel" />}
                    helperText={
                      errors.startTime && <Translator id="required" />
                    }
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Grid
                    container
                    direction="column"
                    spacing={2}
                    alignItems="center"
                  >
                    <Grid item>
                      <FormControlLabel
                        control={
                          <CheckboxStyled
                            color="secondary"
                            name="returnMatches"
                            inputRef={register()}
                            defaultChecked={settings.returnMatches}
                          />
                        }
                        label={<Translator id="returnMatches" />}
                      />
                    </Grid>
                    <Grid item>
                      <TextFieldRC
                        label={<Translator id="fields" />}
                        color="secondary"
                        type="number"
                        inputProps={{
                          name: "fields",
                          ref: register({
                            required: "Required",
                          }),
                        }}
                        helperText={
                          errors.fields && <Translator id="required" />
                        }
                        error={Boolean(errors.fields)}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* ======================================== */}
                <Grid item md={6} xs={12}>
                  <Grid
                    container
                    direction="column"
                    spacing={2}
                    alignItems="center"
                  >
                    <Grid item>
                      <FormControlLabel
                        inputRef={register()}
                        control={
                          <CheckboxStyled
                            color="secondary"
                            name="time"
                            defaultChecked={Boolean(settings.time)}
                          />
                        }
                        label={<Translator id="time" />}
                      />
                    </Grid>
                    <Grid item>
                      <TextFieldRC
                        disabled={!timeChecked}
                        label={<Translator id="matchTime" />}
                        color="secondary"
                        type="number"
                        inputProps={{
                          name: "matchTime",
                          ref: register({
                            required: "Required",
                          }),
                        }}
                        helperText={
                          errors.matchTime && <Translator id="wrongMatchTime" />
                        }
                        error={Boolean(errors.matchTime)}
                      />
                    </Grid>
                    <Grid item>
                      <TextFieldRC
                        disabled={!timeChecked}
                        label={<Translator id="breakTime" />}
                        color="secondary"
                        type="number"
                        inputProps={{
                          name: "breakTime",
                          ref: register({
                            required: "Required",
                          }),
                        }}
                        helperText={
                          errors.breakTime && <Translator id="wrongBreakTime" />
                        }
                        error={Boolean(errors.breakTime)}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <ButtonRC type="submit">
                <Translator id="save" />
              </ButtonRC>
            </DialogActions>
          </MuiPickersUtilsProvider>
        </form>
      </Rosetta>
    </DialogRU>
  );
};

export default GroupSettings;
