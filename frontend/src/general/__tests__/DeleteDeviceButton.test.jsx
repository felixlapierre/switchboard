import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  MenuItem
} from "@material-ui/core";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, jest, it } from "@jest/globals";
import axios from "axios";

import DeleteDeviceButton from "../Buttons/DeleteDeviceButton";
import * as SnackbarMessage from "../SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

const snackbarSpy = jest.spyOn(SnackbarMessage, "snackbar");
const flushPromises = () => new Promise(setImmediate);

describe("DeleteButton", () => {
  let wrapper;
  const testId = "1:10:111:999";

  const setOpen = jest.fn();
  const handleClick = jest.spyOn(React, "useState");

  beforeEach(() => {
    handleClick.mockImplementation((open) => [open, setOpen]);
    wrapper = Enzyme.shallow(<DeleteDeviceButton button deleteId={testId} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  it("Should have 3 total buttons and one dialog for button = true", () => {
    expect(wrapper.find(Button)).toHaveLength(3);
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });
  it("Should have 2 buttons, one dialog, and one menu item for button = false", () => {
    wrapper = Enzyme.shallow(
      <DeleteDeviceButton button={false} deleteId="1:10:111:999" />
    );

    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(MenuItem)).toHaveLength(1);
    expect(wrapper.find(Dialog)).toHaveLength(1);
  });
  it("Should open a confirmation dialog when clicked", () => {
    // click delete button and check that dialog state is open
    wrapper.find("#deleteBtn").simulate("click");
    expect(setOpen).toHaveBeenCalledWith(true);
  });

  describe("Delete device dialog", () => {
    it("Should render with correct child elements", () => {
      expect(wrapper.find(DialogTitle)).toHaveLength(1);
      expect(wrapper.find(DialogContentText)).toHaveLength(1);
      expect(wrapper.find(DialogActions)).toHaveLength(1);
    });

    describe("Cancel button", () => {
      it("Should close the dialog when clicked", () => {
        // click delete button to set open to true
        wrapper.find("#deleteBtn").simulate("click");
        expect(setOpen).toHaveBeenCalledWith(true);

        // click cancel
        wrapper.find("#cancelDeleteBtn").simulate("click");

        // open should be false now
        expect(setOpen).toHaveBeenCalledWith(false);
      });
    });

    describe("ConfirmButton", () => {
      it("Should call axios.delete, close the dialog and display a success snackbar", async () => {
        // click the delete button to set open to true
        wrapper.find("#deleteBtn").simulate("click");
        expect(setOpen).toHaveBeenCalledWith(true);

        // mock axios before clicking confirm
        axios.delete.mockResolvedValueOnce();

        // click confirm
        wrapper.find("#confirmDeleteBtn").simulate("click");

        // check that axios.delete was called
        expect(axios.delete).toHaveBeenCalled();

        // open should be false
        expect(setOpen).toHaveBeenCalledWith(false);

        // Wait for axios promise to finish
        await flushPromises();

        // snackbar should be displayed
        expect(snackbarSpy).toHaveBeenCalledTimes(1);
        expect(snackbarSpy).toHaveBeenCalledWith(
          "success",
          `Device deleted! (Serial Number: ${testId})`,
          "Devices"
        );
      });
      it("If the axios.delete is rejected, it should close the dialog and display an error snackbar", async () => {
        // click the delete button to set open to true
        wrapper.find("#deleteBtn").simulate("click");
        expect(setOpen).toHaveBeenCalledWith(true);

        // mock axios before clicking confirm
        axios.delete.mockRejectedValueOnce();

        // click confirm
        wrapper.find("#confirmDeleteBtn").simulate("click");

        // check that axios.delete was called
        expect(axios.delete).toHaveBeenCalled();

        // Wait for axios promise to finish
        await flushPromises();

        // open should be false
        expect(setOpen).toHaveBeenCalledWith(false);

        // error snackbar should be displayed
        expect(snackbarSpy).toHaveBeenCalledTimes(1);
        expect(snackbarSpy).toHaveBeenCalledWith(
          "error",
          `Could not delete device (Serial Number: ${testId})`
        );
      });
    });
  });
});
