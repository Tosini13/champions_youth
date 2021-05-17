import React, { useState, useEffect } from "react";
import { Rosetta, Translator } from "react-rosetta";

import { DialogActions } from "@material-ui/core";
import notificationsDict from "../../locale/notifications.dict";
import { DialogRU } from "../../styled/styledComponents/navigation/styledDialog";
import { ButtonRC } from "../../styled/styledComponents/styledButtons";
import { useLocale } from "../../Provider/LocaleProvider";

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

export interface NotificationProps {}

const Notification: React.FC<NotificationProps> = () => {
  const { locale } = useLocale();
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
        title={question}
      >
        <DialogActions>
          {answers?.map((answer) => (
            <ButtonRC
              key={answer.title}
              onClick={() => {
                if (answer.action) {
                  answer.action();
                }
                handleClose();
              }}
            >
              <Translator id={answer.title} />
            </ButtonRC>
          ))}
        </DialogActions>
      </DialogRU>
    </Rosetta>
  );
};

export default Notification;
