import React, { useState, useEffect } from "react";
import { Rosetta, Translator } from "react-rosetta";

import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { LOCALE } from "../../locale/config";
import notificationsDict from "../../locale/notifications.dict";
import { DialogRU } from "../../styled/styledDialog";

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

  // TODO: DISABLE SAVE WHEN NO GROUPS CHOSEN OR NO TEAMS IN GROUPS
  return (
    <Rosetta translations={notificationsDict} locale={locale}>
      <DialogRU
        open={open}
        keepMounted
        color="primary"
        onClose={handleClose}
        locale={locale}
        title={question}
      >
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
      </DialogRU>
    </Rosetta>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    locale: state.dictionary.locale,
  };
};

export default connect(mapStateToProps)(Notification);
