import React, { useState } from "react";
import { Fab, Zoom } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import DashboardFramework from "../../components/DashboardFramework";
import DashboardContent from "./DashboardContent";
import AddIcon from "@material-ui/icons/Add";
import AddEditDialog from "../../components/Dialog/AddEditDialog";

const styles = (theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing.unit * 3,
    right: theme.spacing.unit * 3
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

function Dashboard({ classes }) {
  const [tab, selectTab] = useState("Tasks");
  const [open, handleDialogOpen] = useState(false);

  function onTabSelected(tab) {
    selectTab(tab);
  }

  return (
    <DashboardFramework onTabSelected={onTabSelected} route={tab}>
      <DashboardContent tab={tab} />
      <Zoom in={tab === "Tasks"} unmountOnExit>
        <Fab
          color="primary"
          variant="extended"
          className={classes.fab}
          onClick={() => handleDialogOpen(true)}>
          <AddIcon className={classes.extendedIcon} />
          New Task
        </Fab>
      </Zoom>
      <AddEditDialog open={open} handleClose={() => handleDialogOpen(false)} />
    </DashboardFramework>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
