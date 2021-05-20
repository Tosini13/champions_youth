import React from "react";
import { Grid } from "@material-ui/core";

import { StarBorder, Star, Favorite } from "@material-ui/icons";
import styled from "styled-components";
import {
  FavoriteIconButton,
  MyIconButton,
} from "../../../styled/styledComponents/tournament/summary/styledActions";

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
        <FavoriteIconButton aria-label="star" onClick={handleToggleFavorites}>
          {isFavorite ? (
            <Star fontSize="small" />
          ) : (
            <StarBorder fontSize="small" color="secondary" />
          )}
        </FavoriteIconButton>
      </Grid>
      <Grid item>
        {isMy ? (
          <MyIconButton aria-label="star">
            <Favorite fontSize="small" />
          </MyIconButton>
        ) : null}
      </Grid>
    </GridContainer>
  );
};

export default TournamentSummaryActions;
