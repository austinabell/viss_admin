import React from "react";
import {
  Dialog,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import AddDialogContent from "./AddDialogContent";

const styles = (theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: theme.palette.type === "dark" ? "#212121" : null
  },
  flex: {
    flex: 1
  },
  dialog: {
    backgroundColor: theme.palette.type === "dark" ? "#212121" : null
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function AddEditDialog({ classes, open, handleClose, task }) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        classes: {
          root: classes.dialog
        }
      }}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.flex} />
          <IconButton color="inherit" onClick={handleClose} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AddDialogContent handleClose={handleClose} />
    </Dialog>
  );
}

export default withStyles(styles)(AddEditDialog);
