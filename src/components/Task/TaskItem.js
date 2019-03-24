import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import Constants from "../../constants";
import {
  taskDateFormat,
  technicianListFormat,
  taskTimeFormat,
  addressFormat
} from "../../helpers/stringFormat";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import AssignmentIcon from "@material-ui/icons/Assignment";

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
    color: "#fff",
    backgroundColor: Constants.secondaryColor
  },
  avatarFinished: {
    margin: 8,
    color: "#fff",
    backgroundColor: Constants.primaryColor
  },
  avatarCancelled: {
    margin: 8,
    color: "#fff",
    backgroundColor: Constants.orangeColor
  },
  rightActionButton: {
    marginLeft: 16,
    marginRight: 16
    // padding: 8,
    // paddingLeft: 16,
    // paddingRight: 16,
    // color: Constants.primaryColor
  },
  errorText: {
    margin: 16
  }
};

function TaskAvatar({ classes, status }) {
  if (status && status === "f") {
    return (
      <Avatar className={classes.avatarFinished}>
        <DoneIcon />
      </Avatar>
    );
  } else if (status && status === "c") {
    return (
      <Avatar className={classes.avatarCancelled}>
        <CloseIcon />
      </Avatar>
    );
  }
  return (
    <Avatar className={classes.avatar}>
      <AssignmentIcon />
    </Avatar>
  );
}

function TaskItem({ classes, task, onClick, onEditClick }) {
  return (
    <ListItem button onClick={onClick} alignItems="flex-start">
      <ListItemAvatar>
        <TaskAvatar classes={classes} status={task.status} />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Typography variant="body1">
            {task.name && `${task.name} - `}
            {addressFormat(task)}
          </Typography>
        }
        secondary={
          <Fragment>
            <Typography color="textSecondary">
              {`${taskDateFormat(task)} - ${taskTimeFormat(task)}`}
            </Typography>
            <Typography color="textSecondary">
              {technicianListFormat(task.technicians)}
            </Typography>
          </Fragment>
        }
      />
      <ListItemSecondaryAction>
        <IconButton onClick={onEditClick} className={classes.rightActionButton}>
          <EditIcon color="primary" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

TaskItem.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskItem);
