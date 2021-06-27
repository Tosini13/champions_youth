import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { TypographyProps } from "@material-ui/core";
import styled from "styled-components";
import { TypographyPrimaryText } from "../styledTypography";
import { styledColors } from "../../../styled/themes/other";
import { parseStyledBoolean } from "../../../helpers/booleanParser";
import { useLocale } from "../../../Provider/LocaleProvider";
import matchDict from "../../../locale/matchDict";
import useTranslationHelp from "../../../hooks/useTranslationHelp";

const TypographyPrimaryTextStyled = styled(TypographyPrimaryText)`
  font-size: 0.6rem;
  text-transform: uppercase;
  color: white;
  white-space: nowrap;
`;

// White/Navy
export const TypographyMatchHeader: React.FC<TypographyProps> = ({
  children,
  ...props
}) => (
  <TypographyPrimaryTextStyled {...props}>
    {children}
  </TypographyPrimaryTextStyled>
);

export type TTypographyRoundProps = TypographyProps & {
  round: string;
};

export const ShowRound: React.FC<TTypographyRoundProps> = ({ round }) => {
  const { locale } = useLocale();
  const { translateRound } = useTranslationHelp();
  const {
    round: gameRound,
    number,
    isPlayOff,
    isPlace,
    roundLetter,
  } = translateRound(round);
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <>
        {isPlayOff ? null : <Translator id="round" />}{" "}
        {isPlace ? (
          <>
            {number} <Translator id={gameRound} />
          </>
        ) : (
          <>
            <Translator id={gameRound} /> {roundLetter} {number}
          </>
        )}
      </>
    </Rosetta>
  );
};

export const ShowRoundTeam: React.FC<TTypographyRoundProps> = ({ round }) => {
  const { locale } = useLocale();
  const { translateRound } = useTranslationHelp();
  const {
    round: gameRound,
    number,
    isPlace,
    roundLetter,
  } = translateRound(round);
  return (
    <Rosetta translations={matchDict} locale={locale}>
      <>
        {isPlace ? (
          <>
            {number} <Translator id={gameRound} />
          </>
        ) : (
          <>
            <Translator id={gameRound} /> {roundLetter} {number}
          </>
        )}
      </>
    </Rosetta>
  );
};

const TypographyLiveStyled = styled(TypographyPrimaryText)<{
  islive?: string;
}>`
  transition: all 0.2s;
  color: ${styledColors.icons.live};
  font-size: 0.65rem;
  font-weight: bold;
  ${(props) => (props.islive ? "opacity: 1;" : "opacity: 0;")};
`;

type TTypographyLiveMatchHeader = TypographyProps & {
  isLive?: boolean;
};

// White/Navy
export const TypographyLiveMatchHeader: React.FC<TTypographyLiveMatchHeader> =
  ({ children, isLive, ...props }) => (
    <TypographyLiveStyled
      align="center"
      islive={parseStyledBoolean(isLive ?? false)}
      {...props}
    >
      {children}
    </TypographyLiveStyled>
  );
