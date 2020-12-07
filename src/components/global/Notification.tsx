import React, { useState, useEffect } from "react";
import { Rosetta, Translator } from "react-rosetta";

import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import { DialogStyled } from "../../styled/styledLayout";
import { connect } from "react-redux";
import { LOCALE } from "../../locale/config";
import notificationsDict from "../../locale/notifications.dict";

export type Answer = {
  title: string;
  action?: () => any;
};

let setBoolean: (bool: boolean) => void = () => {};
let setString: (str: string) => void = () => {};
let setObjects: (obj?: Answer[]) => void = () => {};

export const useNotification = () => {
  const openNotification = () => setBoolean(true);
  const setQuestion = (question: string) => setString(question);
  const setAnswers = (answers?: Answer[]) => setObjects(answers);
  return {
    openNotification,
    setQuestion,
    setAnswers,
  };
};

export interface NotificationProps {
  locale: LOCALE;
}

const Notification: React.FC<NotificationProps> = ({ locale }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[] | undefined>();

  useEffect(() => {
    setBoolean = setOpen;
    setString = setQuestion;
    setObjects = setAnswers;
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Rosetta translations={notificationsDict} locale={locale}>
      <DialogStyled open={open} keepMounted color="primary">
        <DialogContent>
          <Typography>
            <Translator id={question} />
          </Typography>
        </DialogContent>
        <DialogActions>
          {answers?.map((answer) => (
            <Button
              key={answer.title}
              variant="outlined"
              color="secondary"
              onClick={() => {
                if (answer.action) {
                  answer.action();
                }
                handleClose();
              }}
            >
              <Translator id={answer.title} />
            </Button>
          ))}
        </DialogActions>
      </DialogStyled>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(Notification);
