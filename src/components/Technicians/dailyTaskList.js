import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import { Card, List, Typography, Paper } from "@material-ui/core";
import { connect } from "react-redux";
import gql from "graphql-tag";
import Constants from "../../constants";
import PaperSkeleton from "../skeleton";
import TaskItem from "../Task/taskItem";

const styles = {
  root: {
    marginTop: 0,
    paddingTop: 0,
    width: "100%",
    position: "relative",
    overflow: "auto",
    maxHeight: `calc(100vh - 110px)` // Estimated
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
  },
  centerText: {
    margin: 50,
    textAlign: "center"
  }
};

const GET_TECHNICIAN_TASKS = gql`
  query userTasks($id: ID!) {
    userTasks(id: $id) {
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
      }
    }
  }
`;

function DailyTaskList({ classes, id }) {
  if (!id) {
    return (
      // ? Update empty template
      <Card className={classes.root}>
        <Typography variant="h6" className={classes.centerText}>
          No Technician selected, choose one from the list to the left
        </Typography>
      </Card>
    );
  } else {
    return (
      <Query query={GET_TECHNICIAN_TASKS} variables={{ id }}>
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
                {data.userTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    hideAssigned={true}
                    onClick={() => console.log(`pressed ${task.id}`)}
                  />
                ))}
              </List>
            </Paper>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.technicianData.selectedTechnicianId
});

DailyTaskList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(DailyTaskList));
