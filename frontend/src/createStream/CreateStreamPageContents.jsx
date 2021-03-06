import React from "react";
import { Button, Grid } from "@material-ui/core";
import { Forward } from "@material-ui/icons";

import CreateStreamDeviceCardWrapper from "./CreateStreamDeviceCardWrapper";
import { getSenders, getReceivers } from "../api/DeviceApi";
import { createStream } from "../api/StreamApi";
import { snackbar } from "../general/SnackbarMessage";

export default class CreateStreamPageContents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      senders: [],
      receivers: [],
      senderDeviceIndex: -1,
      senderChannelIndex: -1,
      receiverDeviceIndex: -1,
      receiverChannelIndex: -1
    };

    this.createStream = this.createStream.bind(this);
    this.setSenders = this.setSenders.bind(this);
    this.setReceivers = this.setReceivers.bind(this);
    this.setSenderDeviceIndex = this.setSenderDeviceIndex.bind(this);
    this.setReceiverDeviceIndex = this.setReceiverDeviceIndex.bind(this);
    this.setSenderChannelIndex = this.setSenderChannelIndex.bind(this);
    this.setReceiverChannelIndex = this.setReceiverChannelIndex.bind(this);
  }

  componentDidMount() {
    getSenders().then(this.setSenders);
    getReceivers().then(this.setReceivers);
  }

  setSenders(value) {
    this.setState({
      senders: value
    });
  }

  setReceivers(value) {
    this.setState({
      receivers: value
    });
  }

  setSenderDeviceIndex(value) {
    this.setState({
      senderDeviceIndex: value,
      senderChannelIndex: -1
    });
  }

  setReceiverDeviceIndex(value) {
    this.setState({
      receiverDeviceIndex: value,
      receiverChannelIndex: -1
    });
  }

  setSenderChannelIndex(value) {
    this.setState({
      senderChannelIndex: value
    });
  }

  setReceiverChannelIndex(value) {
    this.setState({
      receiverChannelIndex: value
    });
  }

  createStream() {
    const {
      senders,
      receivers,
      senderDeviceIndex,
      senderChannelIndex,
      receiverDeviceIndex,
      receiverChannelIndex
    } = this.state;

    const receiver = receivers[receiverDeviceIndex];
    const sender = senders[senderDeviceIndex];

    if (receiver && sender) {
      const recieverChannel = receiver.channels[receiverChannelIndex];
      const senderChannel = sender.channels[senderChannelIndex];
      if (recieverChannel && senderChannel)
        createStream(recieverChannel.id, senderChannel.id)
          .then(() => {
            snackbar("success", `Successfully created stream!`);
          })
          .catch(() => {
            snackbar("error", `Failed to create stream`);
          });
    }
  }

  render() {
    const {
      senders,
      receivers,
      senderDeviceIndex,
      senderChannelIndex,
      receiverDeviceIndex,
      receiverChannelIndex
    } = this.state;

    return (
      <Grid
        container
        justify="center"
        alignItems="stretch"
        direction="row"
        spacing={3}
      >
        <Grid item xs={5} style={{ margin: "auto" }}>
          <CreateStreamDeviceCardWrapper
            title="Sender"
            deviceList={senders}
            deviceIndex={senderDeviceIndex}
            setDeviceIndex={this.setSenderDeviceIndex}
            channelIndex={senderChannelIndex}
            setChannelIndex={this.setSenderChannelIndex}
          />
        </Grid>
        <Grid item xs={2} style={{ margin: "auto", textAlign: "center" }}>
          <Forward style={{ fontSize: 100 }} />
        </Grid>
        <Grid item xs={5} style={{ margin: "auto" }}>
          <CreateStreamDeviceCardWrapper
            title="Receiver"
            deviceList={receivers}
            deviceIndex={receiverDeviceIndex}
            setDeviceIndex={this.setReceiverDeviceIndex}
            channelIndex={receiverChannelIndex}
            setChannelIndex={this.setReceiverChannelIndex}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={this.createStream}
          >
            Create Stream
          </Button>
        </Grid>
      </Grid>
    );
  }
}
