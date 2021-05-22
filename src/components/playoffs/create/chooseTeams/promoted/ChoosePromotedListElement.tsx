import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import { Id } from "../../../../../const/structuresConst";
import { PromotedTeam } from "../../../../../NewModels/Team";
import chooseTeamDict from "../../../../../locale/chooseTeam.dict";
import { useLocale } from "../../../../../Provider/LocaleProvider";
import {
  ChooseTeamContentContainer,
  TeamActionContainer,
  TeamContainerStyled,
  TeamLogoContainer,
  TeamsItem,
} from "../../../../../styled/styledComponents/teams/styledLayout";
import Logo, { SIZE_LOGO } from "../../../../global/Logo";
import { TypographyPrimaryText } from "../../../../../styled/styledComponents/styledTypography";
import { ChooseTeamIconButton } from "../../../../../styled/styledComponents/teams/styledButtons";

type Props = {
  element: PromotedTeam;
  selected: boolean;
  groupId?: Id | null;
  addToChosenTeams: (chosenTeam: PromotedTeam, groupId: Id) => void;
  disabled: boolean;
};

const ChoosePromotedListElement: React.FC<Props> = ({
  element,
  selected,
  disabled,
  groupId,
  addToChosenTeams,
}) => {
  const { locale } = useLocale();
  // TODO: PLACE TEXT TRANSLATE
  const handleAddTeam = () => {
    if (groupId) {
      addToChosenTeams(element, groupId);
    }
  };
  return (
    <Rosetta translations={chooseTeamDict} locale={locale}>
      <TeamsItem>
        <TeamContainerStyled
          onClick={() => (disabled ? false : handleAddTeam())}
          style={{ cursor: "pointer" }}
        >
          <TeamLogoContainer>
            <Logo size={SIZE_LOGO.md} />
          </TeamLogoContainer>
          <ChooseTeamContentContainer isRestricted={disabled}>
            <TypographyPrimaryText style={{ color: "white" }}>
              {element.name + " " + element.place + " "}{" "}
              <Translator id="place" />
            </TypographyPrimaryText>
          </ChooseTeamContentContainer>
          <TeamActionContainer>
            {!disabled ? (
              <ChooseTeamIconButton
                isSelected={selected}
                handleClick={() => (disabled ? false : handleAddTeam())}
              />
            ) : null}
          </TeamActionContainer>
        </TeamContainerStyled>
      </TeamsItem>
    </Rosetta>
  );
};

export default ChoosePromotedListElement;
