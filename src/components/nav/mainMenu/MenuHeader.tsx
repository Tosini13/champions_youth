import React from "react";
import { Rosetta, Translator } from "react-rosetta";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { AccountCircle } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import { ListItemStyled } from "./SignedInMenu";

import Language from "../Language";
import Theme from "../Theme";
import { useLocale } from "../../../Provider/LocaleProvider";
import menuDict from "../../../locale/menu";

export interface MenuHeaderProps {
  username?: string;
}

const MenuHeader: React.FC<MenuHeaderProps> = ({ username }) => {
  const { locale } = useLocale();
  return (
    <Rosetta translations={menuDict} locale={locale}>
      <>
        <ListItemStyled borderposition="bottom" button>
          <ListItemIcon>
            <AccountCircle color="secondary" />
          </ListItemIcon>
          <ListItemText
            primary={username ?? <Translator id="youAreLoggedOut" />}
          />
        </ListItemStyled>
        <ListItemStyled borderposition="bottom" button>
          <Grid container justify="space-evenly">
            <Grid item>
              <Language />
            </Grid>
            <Grid item>
              <Theme />
            </Grid>
          </Grid>
        </ListItemStyled>
      </>
    </Rosetta>
  );
};

export default MenuHeader;
