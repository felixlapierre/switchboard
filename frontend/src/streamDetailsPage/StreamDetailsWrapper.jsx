import React from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid } from "@material-ui/core";

import StreamInfo from "../model/StreamInfo";
import DashboardCard from "../general/dashboard/DashboardCard";
// import { getSampleStream } from "../api/SampleStream";

export default function StreamDetailsWrapper(props) {
  const { streamDetailSource } = props;
  return (
    <Container>
      <Grid container spacing={3} >
        <Grid item xs={6}>
          <DashboardCard title="Sender Details" />
        </Grid>
        <Grid item xs={6}>
          <DashboardCard title="Receiver Details" />
        </Grid>
        <Grid item xs={7}>
          <DashboardCard title="Logs" />
        </Grid>
        <Grid item xs={5}>
          <DashboardCard title="Statistics" />
        </Grid>
      </Grid>
    </Container>
  );
}

StreamDetailsWrapper.propTypes = {
  streamDetailSource: PropTypes.instanceOf(StreamInfo).isRequired
};