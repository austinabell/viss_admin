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
import { connect } from "react-redux";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import PaperSkeleton from "../PaperSkeleton";
import Constants from "../../constants";
import { selectTechnician } from "../../actions/technicianActions";
import { updatedFormat } from "../../helpers/stringFormat";

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
  avatarInactive: {
    margin: 8,
    color: "#fff",
    backgroundColor: Constants.orangeColor
  },
  errorText: {
    margin: 16
  }
};

const GET_TECHNICIANS = gql`
  {
    users {
      id
      name
      email
      isStarted
      updatedAt
    }
  }
`;

function TechnicianList({ classes, selectTechnician }) {
  return (
    <Query query={GET_TECHNICIANS}>
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
              {data.users.map((user) => (
                <ListItem
                  key={user.id}
                  button
                  onClick={() => selectTechnician(user.id)}
                  alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      className={
                        user.isStarted ? classes.avatar : classes.avatarInactive
                      }>
                      {user.isStarted ? "A" : "I"}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography variant="body1">
                        {user.name} - {user.email}
                      </Typography>
                    }
                    secondary={
                      <Fragment>
                        <Typography color="textSecondary">
                          {user.isStarted ? "Active" : "Inactive"}
                        </Typography>
                        <Typography color="textSecondary">
                          Last updated: {updatedFormat(user.updatedAt)}
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

TechnicianList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { selectTechnician }
)(withStyles(styles)(TechnicianList));
