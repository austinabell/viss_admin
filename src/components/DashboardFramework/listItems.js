import React from "react";
import {
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  List
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ViewListIcon from "@material-ui/icons/ViewList";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Constants from "../../constants";

const styles = {
  selected: {
    color: Constants.primaryColor
  }
};

function MainListItems(props) {
  const { route, classes, onTabSelected } = props;

  const tasksSelected = route && route.toLowerCase() === "tasks";
  const techniciansSelected = route && route.toLowerCase() === "technicians";

  return (
    <List>
      <ListItem
        button
        onClick={() => (!tasksSelected ? onTabSelected("Tasks") : null)}>
        <ListItemIcon>
          <ViewListIcon color={tasksSelected ? "primary" : "action"} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography
              variant="body1"
              className={tasksSelected ? classes.selected : null}>
              Tasks
            </Typography>
          }
        />
      </ListItem>
      <ListItem
        button
        onClick={() =>
          !techniciansSelected ? onTabSelected("Technicians") : null
        }>
        <ListItemIcon>
          <PeopleIcon color={techniciansSelected ? "primary" : "action"} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography
              variant="body1"
              className={techniciansSelected ? classes.selected : null}>
              Technicians
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
}

MainListItems.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.string.isRequired,
  onTabSelected: PropTypes.func.isRequired
};

export default withStyles(styles)(MainListItems);

export const secondaryListItems = (
  <List>
    <ListSubheader inset>Account</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </List>
);
