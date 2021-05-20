import React from "react";
import { DialogRU } from "../../../../styled/styledComponents/navigation/styledDialog";
import { ScrollBarStyled } from "../../../../styled/styledScrollBar";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import { GroupModel } from "../../../../NewModels/Group";
import MatchSummary from "../../../matches/MatchSummary/MatchSummary";

const GridMatchesContainer = styled(Grid)`
  overflow-x: hidden;
  flex-wrap: nowrap;
  ${ScrollBarStyled}
`;

export interface GroupFormMatchesListDialogProps {
  open: boolean;
  handleClose: () => void;
  group: GroupModel;
}

const GroupFormMatchesListDialog: React.FC<GroupFormMatchesListDialogProps> = ({
  open,
  handleClose,
  group,
}) => {
  return (
    <DialogRU open={open} onClose={handleClose} title="matches">
      <GridMatchesContainer container direction="column">
        {group.matches?.map((match) => {
          const homePlaceholder = group.groupTeams?.find(
            (team) => team.place === match.groupPlaceholder?.home
          );
          const awayPlaceholder = group.groupTeams?.find(
            (team) => team.place === match.groupPlaceholder?.away
          );
          if (homePlaceholder) {
            match.placeholder.home = {
              id: homePlaceholder.group?.id,
              place: homePlaceholder.group?.place,
              name: `${homePlaceholder.group?.id}`,
            };
          }
          if (awayPlaceholder) {
            match.placeholder.away = {
              id: awayPlaceholder.group?.id,
              place: awayPlaceholder.group?.place,
              name: `${awayPlaceholder.group?.id}`,
            };
          }
          return (
            <Grid item key={match.id}>
              <MatchSummary match={match} />
            </Grid>
          );
        })}
      </GridMatchesContainer>
    </DialogRU>
  );
};

export default GroupFormMatchesListDialog;
