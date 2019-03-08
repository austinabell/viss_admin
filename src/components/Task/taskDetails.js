import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Card, CardContent } from "@material-ui/core";

const styles = {
  root: {
    marginTop: 0,
    paddingTop: 0,
    width: "100%",
    position: "relative",
    overflow: "auto",
    height: `calc(100vh - 110px)` // Estimated
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
  }
};

function TaskDetails(props) {
  const { classes } = props;
  const [loaded, setLoaded] = useState(false);

  const apiKey = process.env.REACT_APP_MAPS_KEY;

  const coordinates = "43.006066,-81.2607238";

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
        <Typography gutterBottom variant="h5" component="h2">
          Task
        </Typography>
        <Typography component="p">Details about any given task</Typography>
      </CardContent>
    </Card>
  );
}

TaskDetails.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskDetails);
