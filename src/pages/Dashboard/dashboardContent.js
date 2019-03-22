import React from "react";
import { Grid } from "@material-ui/core";

import TaskList from "../../components/Task/taskList";
import TaskDetails from "../../components/Task/taskDetails";
import TechnicianList from "../../components/Technicians/technicianList";
import DailyTaskList from "../../components/Technicians/dailyTaskList";

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
