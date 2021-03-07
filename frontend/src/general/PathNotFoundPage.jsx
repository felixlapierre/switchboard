import { Grid } from "@material-ui/core";
import React from "react";
import DashboardButton from "./dashboard/DashboardButton";
import DashboardCard from "./dashboard/DashboardCard";
import Page from "./Page";
import { isAuthenticated } from "../api/AuthenticationApi";

export default function PathNotFoundPage() {
  return (
    <Page title="Error 404: Path not found" breadcrumbs={[]}>
      <Grid container justify="center" direction="row" spacing={3}>
        <Grid item xs={4}>
          <DashboardCard title="Sorry, that page doesn't exist!">
            {isAuthenticated() ? (
              <DashboardButton href="/Home">Go Home</DashboardButton>
            ) : (
              <DashboardButton href="/Login">Go Home</DashboardButton>
            )}
          </DashboardCard>
        </Grid>
      </Grid>
    </Page>
  );
}
