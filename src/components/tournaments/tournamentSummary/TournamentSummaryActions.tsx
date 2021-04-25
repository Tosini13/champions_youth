import React from "react";
import { Grid, IconButton } from "@material-ui/core";

import { StarBorder, Star, Favorite } from "@material-ui/icons";
import styled from "styled-components";

const GridContainer = styled(Grid)`
  position: absolute;
  top: 0px;
  right: 0px;
  width: fit-content;
`;

export interface TournamentSummaryActionsProps {
  isFavorite: boolean;
  isMy: boolean;
  handleToggleFavorites: () => void;
}

const TournamentSummaryActions: React.FC<TournamentSummaryActionsProps> = ({
  isFavorite,
  isMy,
  handleToggleFavorites,
}) => {
  return (
    <GridContainer container direction="column">
      <Grid item>
        <IconButton aria-label="star" onClick={handleToggleFavorites}>
          {isFavorite ? (
            <Star fontSize="small" color="secondary" />
          ) : (
            <StarBorder fontSize="small" color="secondary" />
          )}
        </IconButton>
      </Grid>
      <Grid item>
        {isMy ? (
          <IconButton aria-label="star">
            <Favorite fontSize="small" color="secondary" />
          </IconButton>
        ) : null}
      </Grid>
    </GridContainer>
  );
};

export default TournamentSummaryActions;
