import React from "react";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { List } from "@material-ui/core";

const styles = {
  selected: {
    color: "#2CA579"
  }
};

function MainListItems(props) {
  const { selected, classes } = props;

  return (
    <List>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon color={selected === "dashboard" ? "primary" : ""} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography
              variant="body1"
              className={selected === "dashboard" ? classes.selected : null}>
              Dashboard
            </Typography>
          }
        />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon
            color={selected === "technicians" ? "primary" : "action"}
          />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography
              variant="body1"
              className={selected === "technicians" ? classes.selected : null}>
              Technicians
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
}

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
