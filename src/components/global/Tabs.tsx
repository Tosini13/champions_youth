import React from "react";
import SwipeableViews from "react-swipeable-views";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useTheme } from "@material-ui/core/styles";

import styled from "styled-components";

const AppBarStyled = styled(AppBar)`
  position: fixed;
  top: 40px;
  left: 0px;
  z-index: 8;
  min-height: 42px;
  .MuiTabs-root {
    min-height: 42px;
  }
`;

const TabStyled = styled(Tab)`
  min-height: 42px;
`;

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export interface TabsGlobalProps {
  labels: string[];
  components: React.ReactNode[];
}

const TabsGlobal: React.FC<TabsGlobalProps> = ({ labels, components }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const theme = useTheme();
  return (
    <>
      <AppBarStyled position="static" color="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
        >
          {labels.map((label, i) => (
            <TabStyled key={i} label={label} {...a11yProps(i)} />
          ))}
        </Tabs>
      </AppBarStyled>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {components.map((component, i) => (
          <TabPanel key={i} value={value} index={i} dir={theme.direction}>
            {component}
          </TabPanel>
        ))}
      </SwipeableViews>
    </>
  );
};

export default TabsGlobal;
