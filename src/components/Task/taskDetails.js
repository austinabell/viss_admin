import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { connect } from "react-redux";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EditIcon from "@material-ui/icons/Edit";
import {
  addressFormat,
  taskDateFormat,
  taskTimeFormat,
  statusFormat,
  technicianListFormat
} from "../../helpers/stringFormat";

const styles = {
  root: {
    marginTop: 0,
    paddingTop: 0,
    width: "100%",
    position: "relative",
    overflow: "auto",
    maxHeight: `calc(100vh - 110px)` // Estimated
  },
  media: {
    width: "100%",
    height: "auto"
  },
  imageContainer: {
    minHeight: `calc(21vw)`
  },
  loading: {
    minHeight: `calc(21vw)`,
    backgroundColor: "#808080"
  },
  centerText: {
    margin: 50,
    textAlign: "center"
  }
};

function TaskDetails({ classes, task }) {
  const [loaded, setLoaded] = useState(false);

  const apiKey = process.env.REACT_APP_MAPS_KEY;

  if (!task) {
    return (
      // ? Update empty template
      <Card className={classes.root}>
        <Typography variant="h6" className={classes.centerText}>
          No Task selected, choose one from the list to the left
        </Typography>
      </Card>
    );
  } else {
    const coordinates = `${task.lat},${task.lng}`;
    return (
      <Card className={classes.root}>
        <div className={loaded ? classes.imageContainer : classes.loading}>
          <img
            alt=" "
            className={classes.media}
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${coordinates}&zoom=16&scale=1&size=640x320&maptype=roadmap&key=${apiKey}&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0x2ca579%7Clabel:1%7C${coordinates}`}
            onLoad={() => setLoaded(true)}
          />
        </div>
        <CardContent>
          <List component="nav" className={classes.root}>
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                inset
                primary={addressFormat(task)}
                secondary="address"
              />
              <ListItemSecondaryAction>
                <IconButton>
                  <EditIcon color="primary" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                inset
                primary={taskDateFormat(task)}
                secondary={taskTimeFormat(task)}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                inset
                primary={`Status: ${statusFormat(task.status)}`}
                secondary={technicianListFormat(task.technicians)}
              />
            </ListItem>
            <ListItem>
              <ListItemText inset primary="Notes:" secondary={task.notes} />
            </ListItem>
            {/* <Divider variant="middle" /> */}
          </List>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  task: state.taskData.selectedTask
});

TaskDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(TaskDetails));
