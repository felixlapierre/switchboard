import React from "react";
import Proptypes from "prop-types";

import { TableContainer, TableCell, TableRow } from "@material-ui/core";
import ChannelDetailsTable from "../../devicelist/ChannelDetailsTable";
import InputChannelInfo from "../../model/InputChannelInfo";
import OutputChannelInfo from "../../model/OutputChannelInfo";
import StatusIndicator from "../../general/StatusIndicator";
import DeviceName from "../DeviceName";
import DeviceInfo from "../../model/DeviceInfo";

export default class DeviceInfoRow extends React.Component {
  static getPropertyDisplayName(name) {
    switch (name) {
      case "serialNumber":
        return "Serial Number";
      case "lastCommunication":
        return "Last Communication";
      case "privateIp":
        return "Private IP Address";
      case "publicIp":
        return "Public IP Address";
      case "name":
        return "Name";
      case "status":
        return "Status";
      case "channels":
        return "Channels";
      default:
        return "Additional Info";
    }
  }

  static createInnerTable(value) {
    return (
      <TableContainer>
        <ChannelDetailsTable channels={value} />
      </TableContainer>
    );
  }

  static createTableCellContents(name, value, device) {
    switch (name) {
      case "channels":
        return DeviceInfoRow.createInnerTable(value);
      case "status":
        return <StatusIndicator status={value} />;
      case "name":
        return <DeviceName deviceName={value} deviceId={device.serialNumber} />;
      default:
        return value;
    }
  }

  render() {
    const { name, value, device } = this.props;
    return (
      <TableRow>
        <TableCell>{DeviceInfoRow.getPropertyDisplayName(name)}</TableCell>
        <TableCell align="center">
          {DeviceInfoRow.createTableCellContents(name, value, device)}
        </TableCell>
      </TableRow>
    );
  }
}

DeviceInfoRow.propTypes = {
  name: Proptypes.string.isRequired,
  value: Proptypes.oneOfType([
    Proptypes.string,
    Proptypes.arrayOf(
      Proptypes.oneOfType([InputChannelInfo, OutputChannelInfo])
    )
  ]).isRequired,
  device: Proptypes.instanceOf(DeviceInfo).isRequired
};