import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import {
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { DialogStyled } from "../../../styled/styledLayout";
import { LOCALE } from "../../../locale/config";
import groupCreationDict from "../../../locale/creationNav.dict.";
import { MatchTime } from "../../../NewModels/Matches";
import { useForm } from "react-hook-form";
import { CheckboxStyled, TextFieldStyled } from "../../../styled/styledForm";

export interface GroupSettingsProps {
  locale: LOCALE;
  open: boolean;
  handleClose: () => void;
  time?: MatchTime;
  setTime: (time?: MatchTime) => void;
  returnMatches: boolean;
  setReturnMatches: (bool: boolean) => void;
}

const GroupSettings: React.FC<GroupSettingsProps> = ({
  locale,
  open,
  handleClose,
  setTime,
  time,
  returnMatches,
  setReturnMatches,
}) => {
  const { register, errors, getValues } = useForm({
    defaultValues: {
      match: 5,
      break: 2,
    },
  });
  return (
    <Rosetta translations={groupCreationDict} locale={locale}>
      <DialogStyled open={open} onClose={handleClose}>
        <Grid container justify="space-between" alignItems="center" spacing={5}>
          <Grid item>
            <Typography variant="h6">
              <Translator id="settings" />
            </Typography>
          </Grid>
          <Grid item>
            <IconButton color="secondary" size="small" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <FormControlLabel
          control={
            <CheckboxStyled
              color="secondary"
              checked={Boolean(time)}
              onChange={() =>
                time
                  ? setTime(undefined)
                  : setTime({
                      match: getValues("match"),
                      break: getValues("break"),
                    })
              }
            />
          }
          label={<Translator id="time" />}
        />
        <Grid container justify="space-around">
          <Grid item xs={5}>
            <TextFieldStyled
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
              onChange={(e) =>
                setTime({ ...time, match: Number(e.target.value) })
              }
              helperText={errors.match && <Translator id="wrongMatchTime" />}
              error={Boolean(errors.match)}
            />
          </Grid>
          <Grid item xs={5}>
            <TextFieldStyled
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
              onChange={(e) =>
                setTime({ ...time, match: Number(e.target.value) })
              }
              helperText={errors.match && <Translator id="wrongBreakTime" />}
              error={Boolean(errors.match)}
            />
          </Grid>
        </Grid>
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
      </DialogStyled>
    </Rosetta>
  );
};

export default GroupSettings;
