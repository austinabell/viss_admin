import React from "react";
import {
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  List
} from "@material-ui/core";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ViewListIcon from "@material-ui/icons/ViewList";
import PeopleIcon from "@material-ui/icons/People";

import Constants from "../../constants";

const styles = {
  selected: {
    color: Constants.primaryColor
  }
};

function DashboardMainList({ route, classes, onTabSelected }) {
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

DashboardMainList.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.string.isRequired,
  onTabSelected: PropTypes.func.isRequired
};

export default withStyles(styles)(DashboardMainList);
