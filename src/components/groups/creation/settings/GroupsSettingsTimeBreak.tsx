import React, { useMemo, useState } from "react";
import { Rosetta, Translator } from "react-rosetta";
import { Grid, GridProps, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Control, UseFormMethods } from "react-hook-form";
import { ButtonRC } from "../../../../styled/styledComponents/styledButtons";
import { TGroupsSettingsForm } from "./GroupSettings";
import ControlledDateTimePicker from "../../../controlled/ControlledDateTimePicker";
import groupCreationDict from "../../../../locale/creationNav.dict.";
import { useLocale } from "../../../../Provider/LocaleProvider";
import ControlledTextField from "../../../controlled/ControlledTextField";
import styled from "styled-components";
import { useColors } from "../../../../styled/themes/CustomThemeProvider";

const GridStyled = styled(Grid)<{
  buttoncolor: string;
}>`
  border: ${(props) => props.buttoncolor} 1px solid;
  border-radius: 5px;
`;

const GridContainer: React.FC<GridProps> = ({ children, ...props }) => {
  // const theme = useTheme();
  const { buttonColor } = useColors();
  return (
    <GridStyled {...props} buttoncolor={buttonColor}>
      {children}
    </GridStyled>
  );
};

export type TBreak = {
  id: number;
  name: string;
  startDate: MaterialUiPickersDate;
  endDate: MaterialUiPickersDate;
};

type TGroupsSettingsTimeBreakProps = {
  timeChecked: boolean;
  control: Control<TGroupsSettingsForm>;
  watch: UseFormMethods<TGroupsSettingsForm>["watch"];
  defaultDate?: Date;
  defaultBreaksQtt: number;
};

const GroupsSettingsTimeBreak: React.FC<TGroupsSettingsTimeBreakProps> = ({
  timeChecked,
  control,
  watch,
  defaultDate,
  defaultBreaksQtt,
}) => {
  const { locale } = useLocale();
  const [breaksQtt, setBreaksQtt] = useState<number>(defaultBreaksQtt);
  const [breaks, setBreaks] = useState<number[]>(
    Array.from(Array(defaultBreaksQtt).keys())
  );

  const addBreak = () => {
    setBreaks([...breaks, breaksQtt]);
    setBreaksQtt(breaksQtt + 1);
  };

  return (
    <Rosetta translations={groupCreationDict} locale={locale}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Grid container direction="column" spacing={4}>
            {breaks.map((b) => {
              console.log(
                "watch(`timeBreaks[${b}].endDate`)",
                watch(`timeBreaks[${b}].endDate`)
              );

              return (
                <Grid item key={b}>
                  <GridContainer
                    container
                    spacing={3}
                    style={{ position: "relative" }}
                  >
                    <Grid item xs={12}>
                      <Grid container justify="center">
                        <Grid item>
                          <ControlledTextField
                            disabled={!timeChecked}
                            defaultValue={`Break ${Number(b) + 1}`}
                            control={control}
                            name={`timeBreaks[${b}].name`}
                            label={<Translator id="breakName" />}
                            color="secondary"
                            rules={{
                              required: true,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <IconButton
                      disabled={!timeChecked}
                      onClick={() => setBreaks(breaks.filter((br) => br !== b))}
                      style={{ position: "absolute", top: "2px", right: "2px" }}
                    >
                      <Delete />
                    </IconButton>
                    <Grid item md={6} sm={8} xs={12}>
                      <ControlledDateTimePicker
                        disabled={!timeChecked}
                        defaultValue={defaultDate}
                        control={control}
                        label={<Translator id="startDate" />}
                        name={`timeBreaks[${b}].startDate`}
                        format="yyyy-MM-DD HH:mm"
                        cancelLabel={<Translator id="cancel" />}
                        maxDate={watch(`timeBreaks[${b}].endDate`)}
                      />
                    </Grid>
                    <Grid item md={6} sm={8} xs={12}>
                      <ControlledDateTimePicker
                        disabled={!timeChecked}
                        defaultValue={defaultDate}
                        control={control}
                        name={`timeBreaks[${b}].endDate`}
                        label={<Translator id="endDate" />}
                        format="yyyy-MM-DD HH:mm"
                        cancelLabel={<Translator id="cancel" />}
                        minDate={
                          watch(`timeBreaks[${b}].startDate`) ?? defaultDate
                        }
                      />
                    </Grid>
                  </GridContainer>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify="center">
            <Grid item>
              <ButtonRC onClick={addBreak} disabled={!timeChecked}>
                <Translator id="addBreak" />
              </ButtonRC>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Rosetta>
  );
};

export default GroupsSettingsTimeBreak;
