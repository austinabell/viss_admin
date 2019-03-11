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
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Constants from "../../constants";
import { toggleTheme } from "../../actions/configActions";

const styles = {
  selected: {
    color: Constants.primaryColor
  }
};

function SecondaryListItems({ classes, config, toggleTheme }) {
  const darkThemeSelected = config !== undefined && config.theme === "dark";
  return (
    <List>
      <ListSubheader inset>Account</ListSubheader>
      <ListItem button onClick={toggleTheme}>
        <ListItemIcon>
          <VisibilityIcon color={darkThemeSelected ? "primary" : "action"} />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography
              variant="body1"
              className={darkThemeSelected ? classes.selected : null}>
              Dark Theme
            </Typography>
          }
        />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
}

const mapStateToProps = (state) => ({
  config: state.config
});

SecondaryListItems.propTypes = {
  classes: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { toggleTheme }
)(withStyles(styles)(SecondaryListItems));
