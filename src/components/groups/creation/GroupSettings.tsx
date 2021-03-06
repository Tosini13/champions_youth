import React, { useState } from "react";
import { Rosetta, Translator } from "react-rosetta";

import { DialogContent, FormControlLabel, Grid } from "@material-ui/core";

import {
  TextFieldRC,
  CheckboxStyled,
} from "../../../styled/styledComponents/styledForm";
import groupCreationDict from "../../../locale/creationNav.dict.";
import { useForm } from "react-hook-form";
import { SettingType } from "./CreateGroupsScreen";
import { DialogRU } from "../../../styled/styledComponents/navigation/styledDialog";
import { useLocale } from "../../../Provider/LocaleProvider";

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
  const [time, setTime] = useState<boolean>(Boolean(settings.time));
  const [returnMatches, setReturnMatches] = useState<boolean>(
    Boolean(settings.returnMatches)
  );
  const formRef = React.createRef<HTMLFormElement>();
  const { register, errors, handleSubmit, reset } = useForm({});

  React.useEffect(() => {
    reset({
      match: settings.time?.match ?? 5,
      break: settings.time?.break ?? 2,
      fields: settings.fields,
    });
  }, [settings.time, settings.fields, reset]);

  const onSubmit = (values: any) => {
    setSettings({
      ...settings,
      time: time
        ? {
            match: values.match,
            break: values.break,
          }
        : undefined,
      returnMatches,
      fields: values.fields,
    });
  };

  return (
    <Rosetta translations={groupCreationDict} locale={locale}>
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <DialogRU
          open={open}
          onClose={() => {
            formRef.current?.dispatchEvent(new Event("submit"));
            handleClose();
          }}
          title={"settings"}
        >
          <DialogContent>
            <FormControlLabel
              control={
                <CheckboxStyled
                  color="secondary"
                  checked={returnMatches}
                  onChange={() => setReturnMatches(!returnMatches)}
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
                helperText={errors.match && <Translator id="wrongField" />}
                error={Boolean(errors.match)}
              />
            </Grid>
            <FormControlLabel
              control={
                <CheckboxStyled
                  color="secondary"
                  checked={time}
                  onChange={() => setTime(!time)}
                />
              }
              label={<Translator id="time" />}
            />
            <Grid container justify="space-around" spacing={2}>
              <Grid item xs={5}>
                <TextFieldRC
                  disabled={Boolean(!time)}
                  label={<Translator id="matchTime" />}
                  color="secondary"
                  type="number"
                  inputProps={{
                    name: "match",
                    ref: register({
                      required: "Required",
                    }),
                  }}
                  helperText={
                    errors.match && <Translator id="wrongMatchTime" />
                  }
                  error={Boolean(errors.match)}
                />
              </Grid>
              <Grid item xs={5}>
                <TextFieldRC
                  disabled={Boolean(!time)}
                  label={<Translator id="breakTime" />}
                  color="secondary"
                  type="number"
                  inputProps={{
                    name: "break",
                    ref: register({
                      required: "Required",
                    }),
                  }}
                  helperText={
                    errors.match && <Translator id="wrongBreakTime" />
                  }
                  error={Boolean(errors.match)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          {/* TODO: ACTIONS!!! */}
        </DialogRU>
      </form>
    </Rosetta>
  );
};

export default GroupSettings;
