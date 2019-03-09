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
import gql from "graphql-tag";
import { Query } from "react-apollo";
import PaperSkeleton from "../skeleton";
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
    color: "#fff",
    backgroundColor: Constants.primaryColor
  },
  errorText: {
    margin: 16
  }
};

const GET_TASKS = gql`
  {
    me {
      id
      name
      username
      email
      isStarted
      currentLocation {
        lng
        lat
      }
    }
  }
`;

function TaskList(props) {
  const { classes } = props;

  return (
    <Query query={GET_TASKS}>
      {({ loading, error, data }) => {
        if (loading) return <PaperSkeleton />;
        // if (error)
        //   return (
        //     <Paper className={classes.root}>
        //       <Typography variant="body1" className={classes.errorText}>
        //         There was an error in retrieving the data.
        //       </Typography>
        //       <Typography className={classes.errorText}>
        //         Code: {error.message}
        //       </Typography>
        //     </Paper>
        //   );

        return (
          <Paper className={classes.root}>
            <List>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 130].map((val) => (
                <ListItem key={val} button alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>{val}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography variant="body1">
                        {val} Fake St, London, ON
                      </Typography>
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

TaskList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskList);