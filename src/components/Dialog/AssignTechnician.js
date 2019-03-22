import React, { Fragment } from "react";
import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// const styles = (theme) => ({
// listItem: {
//   padding: `${theme.spacing.unit}px 0`
// },
// total: {
//   fontWeight: "700"
// },
// title: {
//   marginTop: theme.spacing.unit * 2
// }
// });

function AssignTechnicianInfo() {
  return (
    <Fragment>
      <Typography variant="h6" gutterBottom>
        Assign Technician(s)
      </Typography>
    </Fragment>
  );
}

AssignTechnicianInfo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default AssignTechnicianInfo;
