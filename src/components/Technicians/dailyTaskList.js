import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper
} from "@material-ui/core";
import { connect } from "react-redux";
import gql from "graphql-tag";
import Constants from "../../constants";
import PaperSkeleton from "../skeleton";

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
  {
    allTasks {
      id
      address
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

function DailyTaskList({ classes, technicianId }) {
  if (!technicianId) {
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
      <Query query={GET_TECHNICIAN_TASKS} variables={{ technicianId }}>
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
                  <ListItem
                    key={task.id}
                    button
                    onClick={() => console.log(`clicked task ${task}`)}
                    alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar className={classes.avatar}>T</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography variant="body1">{task.address}</Typography>
                      }
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
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => ({
  technicianId: state.technicianData.selectedTechnicianId
});

DailyTaskList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(DailyTaskList));
