import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const styles = {
  root: {
    marginTop: 0,
    paddingTop: 0,
    width: "100%",
    position: "relative",
    overflow: "auto",
    height: `calc(100vh - 110px)` // Estimated
  }
};

function DailyTaskList(props) {
  const { classes } = props;

  return <Paper className={classes.root} />;
}

DailyTaskList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DailyTaskList);