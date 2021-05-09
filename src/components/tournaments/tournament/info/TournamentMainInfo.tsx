import React, { ReactElement, useState } from "react";
import { Rosetta, Translator } from "react-rosetta";
import moment, { Moment } from "moment";

import { Grid, useTheme } from "@material-ui/core";
import {
  Share as ShareIcon,
  Place,
  Schedule,
  EventAvailable,
} from "@material-ui/icons";

import { TypographyPrimaryText } from "../../../../styled/styledComponents/styledTypography";
import { LOCALE } from "../../../../locale/config";
import tournamentDetailsDict from "../../../../locale/tournamentDetails";
import TournamentInfoLocation from "./TournamentInfoLocation";
import Share from "../../../share/Share";
import { Id } from "../../../../const/structuresConst";

export interface TournamentMainInfoProps {
  date?: string | Moment;
  city?: string;
  address?: string;
  locale: LOCALE;
  tournamentId: Id;
}

const TournamentMainInfo: React.FC<TournamentMainInfoProps> = ({
  date,
  city,
  address,
  locale,
  tournamentId,
}) => {
  const [openShare, setOpenShare] = useState<boolean>(false);

  const infos = [
    {
      id: 1,
      icon: <ShareIcon />,
      content: (
        <span style={{ cursor: "pointer" }} onClick={() => setOpenShare(true)}>
          <Translator id="share" />
        </span>
      ),
    },
    {
      id: 2,
      icon: <EventAvailable />,
      content: date
        ? moment(date).locale(locale).format("yyyy MMMM DD")
        : undefined,
    },
    {
      id: 3,
      icon: <Schedule />,
      content: date ? moment(date).format("HH:mm") : undefined,
    },
  ];

  return (
    <Rosetta translations={tournamentDetailsDict} locale={locale}>
      <Grid
        container
        direction="column"
        spacing={2}
        style={{ margin: "20px 0px" }}
      >
        {infos.map((info) => (
          <Grid item key={info.id}>
            <InfoItem icon={info.icon}>{info.content}</InfoItem>
          </Grid>
        ))}
        <Grid item>
          <InfoItem icon={<Place />}>
            <TournamentInfoLocation city={city} address={address} />
          </InfoItem>
        </Grid>
        <Share
          locale={locale}
          open={openShare}
          handleClose={() => setOpenShare(false)}
          message={`${process.env.REACT_APP_URL}/tournament/${tournamentId}`}
        />
      </Grid>
    </Rosetta>
  );
};

export default TournamentMainInfo;

export interface InfoItemProps {
  icon: ReactElement;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, children }) => {
  const theme = useTheme();
  return (
    <Grid container alignItems="center" spacing={2} wrap="nowrap">
      <Grid item style={{ color: theme.palette.text.primary }}>
        {icon}
      </Grid>
      <Grid item>
        <TypographyPrimaryText>{children}</TypographyPrimaryText>
      </Grid>
    </Grid>
  );
};
