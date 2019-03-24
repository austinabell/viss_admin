import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { List, Typography, Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import PaperSkeleton from "../PaperSkeleton";
import Constants from "../../constants";
import { selectTask } from "../../actions/taskActions";
import TaskItem from "./TaskItem";
import EditDialog from "../Dialog/EditDialog";
import { durationToString } from "../../helpers/stringFormat";
import { GET_TASKS } from "../../graphql/queries";

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

function TaskList({ classes, selectTask }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editTask, setEditTask] = useState({});

  return (
    <Query query={GET_TASKS} pollInterval={10000}>
      {({ loading, error, data, refetch }) => {
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
                  onEditClick={function() {
                    setDialogOpen(true);
                    setEditTask({
                      ...task,
                      durationString: durationToString(task.duration)
                    });
                  }}
                />
              ))}
            </List>
            <EditDialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              task={editTask}
              updateTask={setEditTask}
              refetch={function() {
                refetch();
                selectTask(undefined);
              }}
            />
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
