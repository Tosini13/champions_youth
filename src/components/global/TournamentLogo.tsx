import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Id } from "../../const/structuresConst";
import {
  getImage,
  getImageJustUploaded,
} from "../tournaments/actions/getImage";
import Logo, { SIZE_LOGO } from "./Logo";

export interface TournamentLogoProps {
  size: SIZE_LOGO;
  teamLogo?: string;
  authorId?: Id;
}

const TournamentLogo: React.FC<TournamentLogoProps> = ({
  size,
  teamLogo,
  authorId,
}) => {
  const { tournamentId } = useParams<{ tournamentId: Id }>();
  const [logo, setLogo] = useState<any>(null);

  useEffect(() => {
    if (teamLogo) {
      getImage(teamLogo, tournamentId)
        .then((image) => {
          let img = image;
          if (!image && teamLogo && authorId) {
            img = getImageJustUploaded(teamLogo, authorId) ?? undefined;
          }
          console.log("img to setLogo", img);

          setLogo(img);
        })
        .catch((err) => console.error("error while fetching logo", err));
    }
  }, [teamLogo, tournamentId]);

  return <Logo src={logo} size={size} />;
};

export default TournamentLogo;
