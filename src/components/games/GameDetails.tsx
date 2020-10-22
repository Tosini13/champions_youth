import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useTheme } from "@material-ui/core/styles";

type Props = {};

const GameDetails: React.FC<Props> = ({}) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>XD</DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  console.log(state, ownProps);
  return {};
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props: any) => {
    console.log(props.match.params.gameId);
    return [
      {
        collection: "tournaments",
        doc: props.match.params.tournamentId,
        subcollections: [
          {
            collection: "playOffs",
            doc: props.match.params.gameId,
            subcollections: [{ collection: "matches" }],
            storeAs: "matches",
          },
        ],
        storeAs: "playOffs",
      },
    ];
  })
)(GameDetails);
