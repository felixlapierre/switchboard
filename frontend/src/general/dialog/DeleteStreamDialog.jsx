import React from "react";
import PropTypes from "prop-types";

import Dialog from "./Dialog";
import { deleteStream } from "../../api/StreamApi";

export default class DeleteStreamDialog extends React.Component {
  constructor(props) {
    super(props);

    this.dialogElement = React.createRef();
    this.confirmDelete = this.confirmDelete.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  afterDelete(){
    const { history } = this.props;
    this.dialogElement.current.closeDialog();
    history.push("/Streaming");
    history.go(0);
  }

  confirmDelete() {
    const { deleteId } = this.props;
    deleteStream(deleteId, this.afterDelete);
  }

  // used by Summoner to summon
  openDialog() {
    return this.dialogElement.current.openDialog();
  }

  render() {
    const { deleteId } = this.props;
    const title = "Confirm Delete";
    const message = `Are you sure you want to end stream ${deleteId}?`;

    const actionButton = {
      name: "Confirm",
      onClick: this.confirmDelete
    };

    return (
      <Dialog
        ref={this.dialogElement}
        title={title}
        actionButton={actionButton}
      >
        {message}
      </Dialog>
    );
  }
}

DeleteStreamDialog.propTypes = {
  deleteId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired
  }).isRequired
};