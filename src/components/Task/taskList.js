import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  List,
  Typography,
  Paper
} from "@material-ui/core";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import PaperSkeleton from "../skeleton";
import Constants from "../../constants";
import { selectTask } from "../../actions/taskActions";
import TaskItem from "./taskItem";

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
    backgroundColor: Constants.primaryColor
  },
  errorText: {
    margin: 16
  }
};

const GET_TASKS = gql`
  {
    allTasks {
      id
      address
      city
      province
      duration
      windowStart
      windowEnd
      isAllDay
      status
      lat
      lng
      technicians {
        name
        email
      }
    }
  }
`;

function TaskList({ classes, selectTask }) {
  return (
    <Query query={GET_TASKS}>
      {({ loading, error, data }) => {
        if (loading) return <PaperSkeleton />;
        if (error)
          return (
            <Paper className={classes.root}>
              <Typography variant="body1" className={classes.errorText}>
                There was an error in retrieving the data.
              </Typography>
              <Typography className={classes.errorText}>
                Code: {error.message}
              </Typography>
            </Paper>
          );

        return (
          <Paper className={classes.root}>
            <List>
              {data.allTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onClick={() => selectTask(task)}
                />
              ))}
            </List>
          </Paper>
        );
      }}
    </Query>
  );
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { selectTask }
)(withStyles(styles)(TaskList));
