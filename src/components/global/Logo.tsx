import React from "react";
import styled from "styled-components";
import trophy from "../../images/logo/tournament_logo_trophy2.png";

export enum SIZE_LOGO {
  lg = "60px",
  md = "40px",
  sm = "20px",
}

const LogoContainer = styled.div<{
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

const LogoStyled = styled.img<{
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
