import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

import VerticalTabs from "./VerticalTabs";
import TabPanel from "./TabPanel";
import DevicesTable from "./DevicesTable";

export default class ContentsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      senders: [],
      receivers: [],
      value: 0
    };
    this.dataSource = props.dataSource;
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSendersChange = this.handleSendersChange.bind(this);
    this.handleReceiversChange = this.handleReceiversChange.bind(this);
  }

  componentDidMount() {
    this.dataSource.getSenders(this.handleSendersChange);
    this.dataSource.getReceivers(this.handleReceiversChange);
  }

  handleValueChange(tabIndex) {
    this.setState({
      value: tabIndex
    });
  }

  handleSendersChange(senders) {
    this.setState({
      senders
    });
  }

  handleReceiversChange(receivers) {
    this.setState({
      receivers
    });
  }

  render() {
    const { receivers, senders, value } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Box
          style={{
            display: "flex",
            flexGrow: 1,
            maxHeight: 500
          }}
          border={1}
          borderColor="#f1f1f1"
        >
          <VerticalTabs
            value={value}
            setValue={this.handleValueChange}
            classes={classes}
          />
          <TabPanel value={value} index={0}>
            <DevicesTable devices={senders} title="List of Senders" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DevicesTable devices={receivers} title="List of Receivers" />
          </TabPanel>
        </Box>
      </>
    );
  }
}
ContentsTable.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired,
  classes: PropTypes.shape({
    tabs: PropTypes.string
  }).isRequired
};
