import React from "react";
import { MatchData } from "../../../structures/match";
import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import { matchModeConst } from "../../../const/matchConst";

const TeamName = styled(Typography)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 10px;
  padding: 2px;
`;

const HostName = styled(TeamName)`
  text-align: right;
`;

const GuestName = styled(TeamName)`
  text-align: left;
`;

const ResultGoal = styled(Grid)`
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 13px;
  margin: 2px;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  text-align: center;
`;

const Goal = styled(Typography)`
  font-size: 13px;
`;

const Divider = styled(Typography)`
  font-size: 13px;
  text-align: center;
`;

export interface MatchContentProps {
  match: MatchData;
}

const MatchContent: React.FC<MatchContentProps> = ({ match }) => {
  const isResult = match.mode !== matchModeConst.notStarted;
  return (
    <Grid container wrap="nowrap" alignItems="center">
      <Grid item xs={10}>
        <Grid
          container
          justify="space-evenly"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item xs={5}>
            <HostName color="secondary">
              {match.home
                ? match.home.name
                : match.placeholder.home
                ? match.placeholder.home.name
                : "brak zespołu"}
            </HostName>
          </Grid>
          <Grid item xs={2}>
            <Divider color="secondary">vs</Divider>
          </Grid>
          <Grid item xs={5}>
            <GuestName color="secondary">
              {match.away
                ? match.away.name
                : match.placeholder.away
                ? match.placeholder.away.name
                : "brak zespołu"}
            </GuestName>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Grid
          container
          justify="space-evenly"
          alignItems="center"
          wrap="nowrap"
        >
          <ResultGoal item>
            <Goal color="secondary">
              {isResult ? match.result?.home : null}
            </Goal>
          </ResultGoal>
          <Grid item>
            <Divider color="secondary">:</Divider>
          </Grid>
          <ResultGoal item>
            <Goal color="secondary">
              {isResult ? match.result?.away : null}
            </Goal>
          </ResultGoal>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MatchContent;
