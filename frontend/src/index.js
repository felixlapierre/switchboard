import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HeaderBar from './HeaderAppBar';
import * as serviceWorker from './serviceWorker';
import DeviceList from './DeviceList';

import {
  Breadcrumbs,
  Typography,
  Link,
  Box,
} from "@material-ui/core"

ReactDOM.render(
  <React.StrictMode>
    <HeaderBar />
    <Box padding="2em 0em 0em 10em">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" >
          Home
        </Link>
        <Typography component={'span'} color="textPrimary">Devices</Typography>
      </Breadcrumbs>
    </Box>
    <Box padding="1em">
      <DeviceList />
    </Box>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
