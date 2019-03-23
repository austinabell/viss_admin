import React from "react";
import { Grid } from "@material-ui/core";

import TaskList from "../../components/Task/TaskList";
import TaskDetails from "../../components/Task/TaskDetails";
import TechnicianList from "../../components/Technicians/TechnicianList";
import DailyTaskList from "../../components/Technicians/DailyTaskList";

function DashboardContent({ tab }) {
  if (tab === "Technicians") {
    return (
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <TechnicianList />
        </Grid>
        <Grid item xs={6}>
          <DailyTaskList />
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <TaskList />
        </Grid>
        <Grid item xs={6}>
          <TaskDetails />
        </Grid>
      </Grid>
    );
  }
}

export default DashboardContent;
