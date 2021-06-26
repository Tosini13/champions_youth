import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import Grid from "@material-ui/core/Grid";

import { GroupModel } from "../../../../NewModels/Group";
import GroupTable from "./GroupTable";
import {
  SectionContentStyled,
  SectionNavStyled,
  SectionStyled,
  SectionFooterStyled,
} from "../../../../styled/styledLayout";
import groupDetailsDict from "../../../../locale/groupDetails.dict";
import { ButtonRC } from "../../../../styled/styledComponents/styledButtons";
import { TypographyPrimaryText } from "../../../../styled/styledComponents/styledTypography";
import { useLocale } from "../../../../Provider/LocaleProvider";

export interface GroupTableViewProps {
  isOwner: boolean;
  group: GroupModel;
  handleFinishGroup?: () => void;
  handleContinueGroup?: () => void;
}

const GroupTableView: React.FC<GroupTableViewProps> = ({
  isOwner,
  group,
  handleFinishGroup,
  handleContinueGroup,
}) => {
  const { locale } = useLocale();
  // TODO: REMOVE BUTTONS WHEN THERE'S NO PLAYOFFS - OR SET WINNERS
  return (
    <Rosetta translations={groupDetailsDict} locale={locale}>
      <SectionStyled>
        <SectionNavStyled style={{ paddingTop: "10px" }}>
          <TypographyPrimaryText variant="h6" align="center">
            {group.name}
          </TypographyPrimaryText>
        </SectionNavStyled>
        <SectionContentStyled>
          <GroupTable
            groupTeams={group.groupTeams}
            matches={group.matches}
            teams={group.teams}
            playOffs={group.playOffs}
            playOffsGroup={group.playOffsGroup}
          />
        </SectionContentStyled>
        <SectionFooterStyled>
          {isOwner && (handleContinueGroup || handleFinishGroup) ? (
            <Grid item>
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  {group.finished === true ? (
                    <ButtonRC
                      style={{ margin: "0px auto" }}
                      onClick={handleContinueGroup}
                    >
                      <Translator id="continueGroup" />
                    </ButtonRC>
                  ) : (
                    <ButtonRC
                      style={{ margin: "0px auto" }}
                      onClick={handleFinishGroup}
                    >
                      <Translator id="finishGroup" />
                    </ButtonRC>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </SectionFooterStyled>
      </SectionStyled>
    </Rosetta>
  );
};

export default GroupTableView;
