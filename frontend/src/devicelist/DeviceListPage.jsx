import React from "react";
import { Box, Container } from "@material-ui/core";

import PropTypes from "prop-types";
import TitleBox from "./TitleBox";
import ContentsTable from "./ContentsTable";
import DynamicBreadcrumb from "../General/DynamicBreadcrumb";
import * as useStyles from "../DefaultMakeStylesTheme";

export default class DeviceListPage extends React.Component {
  render() {
    const { dataSource } = this.props;
    return (
      <Container>
        <DynamicBreadcrumb
          breadcrumbs={[
            ["Home", ""],
            ["My Devices", "Devices"]
          ]}
        />
        <Box padding="1em">
          <TitleBox />
          <ContentsTable classes={useStyles} dataSource={dataSource} />
        </Box>
      </Container>
    );
  }
}
DeviceListPage.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
