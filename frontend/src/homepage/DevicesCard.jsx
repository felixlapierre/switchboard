import React from "react";
import { Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import DashBoardButton from "../general/dashboard/DashboardButton";

export default function DevicesCard() {
  return (
    <DashboardCard title="Devices">
      <Grid item xs={4}>
        <DashBoardButton href="/Devices">View Senders</DashBoardButton>
      </Grid>
      <Grid item xs={4}>
        <DashBoardButton href="/Devices">View Receivers</DashBoardButton>
      </Grid>
    </DashboardCard>
  );
}
