import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper
} from "@material-ui/core";
import Constants from "../../constants";

const styles = {
  root: {
    marginTop: 0,
    paddingTop: 0,
    width: "100%",
    position: "relative",
    overflow: "auto",
    height: `calc(100vh - 110px)` // Estimated
  },
  inline: {
    display: "inline"
  },
  avatar: {
    margin: 8,
    marginTop: 12,
    color: "#fff",
    backgroundColor: Constants.primaryColor
  }
};

function TaskList(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <List>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 130].map((val) => (
          <ListItem key={val} button alignItems="flex-start">
            <ListItemAvatar>
              <Avatar className={classes.avatar}>{val}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${val} Fake St, London, ON`}
              secondary={
                <Fragment>
                  <Typography color="textSecondary">
                    30 minutes 9:00 AM-5:00PM
                  </Typography>
                  <Typography color="textSecondary">
                    Assigned to Austin
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskList);
