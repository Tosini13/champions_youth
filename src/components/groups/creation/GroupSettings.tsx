import React, { useEffect } from "react";
import { Rosetta, Translator } from "react-rosetta";

import {
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
} from "@material-ui/core";

import {
  TextFieldRC,
  CheckboxStyled,
} from "../../../styled/styledComponents/styledForm";
import groupCreationDict from "../../../locale/creationNav.dict.";
import { useForm } from "react-hook-form";
import { SettingType } from "./CreateGroupsScreen";
import { DialogRU } from "../../../styled/styledComponents/navigation/styledDialog";
import { useLocale } from "../../../Provider/LocaleProvider";
import { ButtonRC } from "../../../styled/styledComponents/styledButtons";

type TForm = {
  returnMatches: boolean;
  fields: number;
  time: boolean;
  matchTime: number;
  breakTime: number;
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
  const { register, errors, handleSubmit, reset, watch, getValues } =
    useForm<TForm>({});

  React.useEffect(() => {
    reset({
      time: Boolean(settings.time),
      returnMatches: settings.returnMatches,
      matchTime: settings.time?.match ?? 5,
      breakTime: settings.time?.break ?? 2,
      fields: settings.fields,
    });
  }, [settings, reset, open]);

  const onSubmit = (values: TForm) => {
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
    });
    handleClose();
  };

  const handleCloseAndReset = () => {
    handleClose();
  };

  const timeChecked = watch("time");

  return (
    <Rosetta translations={groupCreationDict} locale={locale}>
      <DialogRU open={open} onClose={handleCloseAndReset} title={"settings"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
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
            <Grid item xs={5}>
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
                helperText={errors.fields && <Translator id="wrongField" />}
                error={Boolean(errors.fields)}
              />
            </Grid>
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
            <Grid container justify="space-around" spacing={2}>
              <Grid item xs={5}>
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
              <Grid item xs={5}>
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
          </DialogContent>
          <DialogActions>
            <ButtonRC type="submit">
              <Translator id="save" />
            </ButtonRC>
          </DialogActions>
        </form>
      </DialogRU>
    </Rosetta>
  );
};

export default GroupSettings;
