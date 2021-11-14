import React, { useState } from "react";
import { Rosetta, Translator } from "react-rosetta";
import { Grid, GridProps, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { Control } from "react-hook-form";
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
  name: string;
  startDate: MaterialUiPickersDate;
  endDate: MaterialUiPickersDate;
};

type TGroupsSettingsTimeBreakProps = {
  control: Control<TGroupsSettingsForm>;
  defaultDate?: Date;
};

const GroupsSettingsTimeBreak: React.FC<TGroupsSettingsTimeBreakProps> = ({
  control,
  defaultDate,
}) => {
  const { locale } = useLocale();
  const [breaks, setBreaks] = useState<string[]>([]);

  const addBreak = () => {
    setBreaks([...breaks, Date.now().toString()]);
  };

  return (
    <Rosetta translations={groupCreationDict} locale={locale}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Grid container direction="column" spacing={4}>
            {breaks.map((b, i) => (
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
                          defaultValue={`Break ${Number(i) + 1}`}
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
                    onClick={() => setBreaks(breaks.filter((br) => br !== b))}
                    style={{ position: "absolute", top: "2px", right: "2px" }}
                  >
                    <Delete />
                  </IconButton>
                  <Grid item md={6} sm={8} xs={12}>
                    <ControlledDateTimePicker
                      defaultValue={defaultDate}
                      control={control}
                      label={<Translator id="startDate" />}
                      name={`timeBreaks[${b}].startDate`}
                      format="yyyy-MM-DD HH:mm"
                      cancelLabel={<Translator id="cancel" />}
                    />
                  </Grid>
                  <Grid item md={6} sm={8} xs={12}>
                    <ControlledDateTimePicker
                      defaultValue={defaultDate}
                      control={control}
                      name={`timeBreaks[${b}].endDate`}
                      label={<Translator id="endDate" />}
                      format="yyyy-MM-DD HH:mm"
                      cancelLabel={<Translator id="cancel" />}
                    />
                  </Grid>
                </GridContainer>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container justify="center">
            <Grid item>
              <ButtonRC onClick={addBreak}>Add Time Break</ButtonRC>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Rosetta>
  );
};

export default GroupsSettingsTimeBreak;
