import React from "react";
import { Grid } from "@material-ui/core";

import axios from "axios";

import PropTypes from "prop-types";
import SelectDevicesTable from "./SelectDevicesTable";
import StreamButton from "../general/Buttons/StreamButton";

export default class StreamingTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      senders: [],
      receivers: [],
      selectedSenderID: "",
      selectedReceiverID: ""
    };

    this.dataSource = props.dataSource;
    this.handleSendersChange = this.handleSendersChange.bind(this);
    this.handleReceiversChange = this.handleReceiversChange.bind(this);

    this.onSenderSelected = this.onSenderSelected.bind(this);
    this.onReceiverSelected = this.onReceiverSelected.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.dataSource.getSenders(this.handleSendersChange);
    this.dataSource.getReceivers(this.handleReceiversChange);
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

  onSenderSelected(selectedSender) {
    this.setState({
      selectedSenderID: selectedSender.target.value
    });
  }

  onReceiverSelected(selectedReceiver) {
    this.setState({
      selectedReceiverID: selectedReceiver.target.value
    });
  }

  handleSubmit(event) {
    const { selectedReceiverID, selectedSenderID } = this.state;
    if (selectedReceiverID === "" || selectedSenderID === "") {
      console.log("Please select a sender and a receiver");
    } else {
      axios
        .post("http://localhost:8080/stream", {
          inputChannelId: selectedReceiverID,
          outputChannelId: selectedSenderID
        })
        .then((response) => {
          console.log("Success. Stream Started.");
        });
    }
    event.preventDefault();
  }

  render() {
    const { receivers, senders } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit} id="createStreamForm">
          <Grid
            container
            spacing={2}
            alignContent="center"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={3}>
              <div className="streamingTable" id="SenderTable">
                <SelectDevicesTable
                  name="Sender Devices"
                  dataSource={senders}
                  onChange={this.onSenderSelected.bind(this)}
                />
              </div>
            </Grid>
            <Grid
              container
              item
              xs={2}
              id="TableStartStreamingBtn"
              justify="center"
              alignContent="center"
              alignItems="center"
              display="flex"
            >
              <StreamButton id="StreamingStreamBtn" type="submit" />
            </Grid>
            <Grid item xs={3}>
              <div className="streamingTable" id="ReceiverTable">
                <SelectDevicesTable
                  name="Receiver Devices"
                  dataSource={receivers}
                  onChange={this.onReceiverSelected.bind(this)}
                />
              </div>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}
StreamingTable.propTypes = {
  dataSource: PropTypes.objectOf(PropTypes.func).isRequired
};
