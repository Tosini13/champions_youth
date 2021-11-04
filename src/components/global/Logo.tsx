import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Id } from "../../const/structuresConst";
import trophy from "../../images/logo/tournament_logo_trophy2.png";
import {
  getImage,
  getImageJustUploaded,
} from "../tournaments/actions/getImage";

export enum SIZE_LOGO {
  lg = "60px",
  md = "40px",
  sm = "20px",
}

export const LogoContainer = styled.div<{
  size: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.size
      ? `
        height: ${props.size};
        width: ${props.size}`
      : `
        height: ${SIZE_LOGO.sm};
        width: ${SIZE_LOGO.sm};`}
`;

export const LogoStyled = styled.img<{
  size: string;
}>`
  ${(props) =>
    props.size
      ? `
      max-height: ${props.size};
      max-width: ${props.size}`
      : `
      max-height: ${SIZE_LOGO.sm};
      max-width: ${SIZE_LOGO.sm};`}
`;

export interface LogoProps {
  size: SIZE_LOGO;
  src?: string;
}

const Logo: React.FC<LogoProps> = ({ size, src }) => {
  const handleError = (e: any) => {
    e.target.src = trophy;
  };

  return (
    <LogoContainer size={size}>
      <LogoStyled onError={handleError} src={src ? src : trophy} size={size} />
    </LogoContainer>
  );
};

export default Logo;

export interface TeamLogoProps {
  size: SIZE_LOGO;
  teamLogo?: string;
}

export const TeamLogo: React.FC<TeamLogoProps> = ({ size, teamLogo }) => {
  const { tournamentId } = useParams<{ tournamentId: Id }>();
  const [logo, setLogo] = useState<any>(null);

  useEffect(() => {
    if (teamLogo) {
      getImage(teamLogo, tournamentId)
        .then((image) => {
          let img = image;
          if (!image && teamLogo) {
            img = getImageJustUploaded(teamLogo, tournamentId) ?? undefined;
          }
          setLogo(img);
        })
        .catch((err) => console.error("error while fetching logo", err));
    }
  }, [teamLogo, tournamentId]);

  return <Logo src={logo} size={size} />;
};
