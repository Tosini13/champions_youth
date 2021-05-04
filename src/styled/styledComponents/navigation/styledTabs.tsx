import React from "react";
import { Tab, TabProps, Tabs, TabsProps, useTheme } from "@material-ui/core";
import styled from "styled-components";

const TabsStyled = styled(Tabs)`
  background-color: ${(props) => props.theme.palette.primary.main};
  .MuiTabs-scroller > span {
    background-color: ${(props) => props.theme.palette.text.secondary};
  }
`;

type TTabsContainer = TabsProps & {
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
