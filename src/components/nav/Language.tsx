import React from "react";
import { connect } from "react-redux";
import { Rosetta } from "react-rosetta";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import { FlagImgStyled } from "../../styled/styledLayout";

import { LOCALE } from "../../locale/config";
import { setLocale } from "../../store/actions/DictionaryActions";
import plFlag from "../../images/flags/pl.png";
import enFlag from "../../images/flags/us.png";
import languageDict from "../../locale/language";
import { IconButton } from "@material-ui/core";
import { DialogRU } from "../../styled/styledComponents/navigation/styledDialog";
import { useLocale } from "../../Provider/LocaleProvider";

export interface LanguageProps {}

const Language: React.FC<LanguageProps> = () => {
  const { handleChangeLocale, locale } = useLocale();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (locale: LOCALE) => {
    setOpen(false);
  };

  const handleSetLocale = (locale: LOCALE) => {
    handleChangeLocale(locale);
    setOpen(false);
  };

  const getFlag = (locale: LOCALE) => {
    switch (locale) {
      case LOCALE.polish:
        return plFlag;
      default:
        return enFlag;
    }
  };

  return (
    <Rosetta translations={languageDict} locale={locale}>
      <>
        <IconButton size="small" onClick={handleOpen}>
          <FlagImgStyled src={getFlag(locale)} alt={locale} />
        </IconButton>
        <DialogRU
          onClose={handleClose}
          aria-labelledby="simple-dialog-title"
          open={open}
          title="chooseLanguage"
        >
          <List>
            <ListItem button onClick={() => handleSetLocale(LOCALE.english)}>
              <ListItemAvatar>
                <FlagImgStyled
                  src={getFlag(LOCALE.english)}
                  alt={LOCALE.english}
                />
              </ListItemAvatar>
              <ListItemText primary="English" />
            </ListItem>
            <ListItem button onClick={() => handleSetLocale(LOCALE.polish)}>
              <ListItemAvatar>
                <FlagImgStyled
                  src={getFlag(LOCALE.polish)}
                  alt={LOCALE.polish}
                />
              </ListItemAvatar>
              <ListItemText primary="Polski" />
            </ListItem>
          </List>
        </DialogRU>
      </>
    </Rosetta>
  );
};

const mapStateToProps = (state: any) => {
  const loggedIn = Boolean(state.firebase.auth.uid);
  return {
    loggedIn,
    locale: state.dictionary.locale,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setLocale: (locale: LOCALE) => dispatch(setLocale(locale)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Language);
