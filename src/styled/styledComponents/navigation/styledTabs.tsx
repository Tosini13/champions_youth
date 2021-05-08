import React from "react";
import { Tab, TabProps, Tabs, TabsProps, useTheme } from "@material-ui/core";
import styled from "styled-components";

export enum E_TAB_PLACE {
  "TOP" = "TOP",
  "BOTTOM" = "BOTTOM",
}

const rgb = "100 100 100";

const TabsStyled = styled(Tabs)<{
  place?: E_TAB_PLACE;
}>`
  z-index: 1;
  background-color: ${(props) => props.theme.palette.primary.dark};
  ${(props) =>
    props.place
      ? `box-shadow: 0 -2px 2px 0 rgb(${rgb} / 14%), 0 -3px 1px -2px rgb(${rgb} / 12%), 0 -1px 5px 0 rgb(${rgb} / 20%);`
      : `box-shadow: 0 2px 2px 0 rgb(${rgb} / 14%), 0 3px 1px -2px rgb(${rgb} / 12%), 0 1px 5px 0 rgb(${rgb} / 20%);`}
  .MuiTabs-scroller > span {
    background-color: ${(props) => props.theme.palette.text.secondary};
    ${(props) => (props.place ? "top: 0px;" : "")};
  }
`;

type TTabsContainer = TabsProps & {
  place?: E_TAB_PLACE;
  handleChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
};

export const TabsContainer: React.FC<TTabsContainer> = ({
  children,
  handleChange,
  ...props
}) => {
  const theme = useTheme();
  return (
    <TabsStyled {...props} theme={theme} onChange={handleChange}>
      {children}
    </TabsStyled>
  );
};

export const TabStyled = styled(Tab)`
  flex-grow: 1;
  max-width: none;
  color: ${(props) => props.theme.palette.text.primary};
`;

export const TabRC: React.FC<TabProps> = ({ children, ...props }) => {
  const theme = useTheme();
  return <TabStyled {...props} theme={theme} />;
};
