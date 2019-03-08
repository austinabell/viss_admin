import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import DashboardFramework from "../../components/DashboardFramework";
import TaskList from "../../components/Task/taskList";
import TaskDetails from "../../components/Task/taskDetails";
import TechnicianList from "../../components/Technicians/technicianList";
import DailyTaskList from "../../components/Technicians/dailyTaskList";

function Dashboard() {
  const [tab, selectTab] = useState("Tasks");

  function onTabSelected(tab) {
    selectTab(tab);
  }

  if (tab === "Tasks") {
    return (
      <DashboardFramework onTabSelected={onTabSelected} route={tab}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TaskList />
          </Grid>
          <Grid item xs={6}>
            <TaskDetails />
          </Grid>
        </Grid>
      </DashboardFramework>
    );
  } else if (tab === "Technicians") {
    return (
      <DashboardFramework onTabSelected={onTabSelected} route={tab}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TechnicianList />
          </Grid>
          <Grid item xs={6}>
            <DailyTaskList />
          </Grid>
        </Grid>
      </DashboardFramework>
    );
  } else {
    return (
      <DashboardFramework onTabSelected={onTabSelected} route={tab}>
        Fallback
      </DashboardFramework>
    );
  }
}

export default Dashboard;
