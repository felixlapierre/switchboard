import React from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

import StreamInfo from "../model/StreamInfo";

export default function StreamDetailsButton(props) {
  const { streamInfo } = props;

  return (
    <>
      <NavLink
        to={{
          pathname: `/Streams/Details/${streamInfo.id}`,
          state: { stream: streamInfo }
        }}
      >
        <Tooltip title="View Stream Details">
          <IconButton>
            <Description />
          </IconButton>
        </Tooltip>
      </NavLink>
    </>
  );
}

StreamDetailsButton.propTypes = {
  streamInfo: PropTypes.instanceOf(StreamInfo).isRequired
};
