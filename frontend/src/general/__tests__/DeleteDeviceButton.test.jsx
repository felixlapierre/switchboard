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

import DeleteDeviceButton from "../DeleteDeviceButton";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

const mockHistoryPush = jest.fn();
const mockHistoryGo = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockHistoryPush,
    go: mockHistoryGo
  })
}));

describe("DeleteButton", () => {
  let wrapper;

  const setOpen = jest.fn();
  const handleClick = jest.spyOn(React, "useState");

  beforeEach(() => {
    handleClick.mockImplementation((open) => [open, setOpen]);
    wrapper = Enzyme.shallow(
      <DeleteDeviceButton button deleteId="1:10:111:999" />
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
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
    // check that open is false to begin with
    expect(setOpen).toBeFalsy;

    // click delete button and check that dialog state is open
    wrapper.find("#deleteBtn").simulate("click");
    expect(setOpen).toBeTruthy;
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
        expect(setOpen).toBeTruthy;

        // click cancel
        wrapper.find("#cancelDeleteBtn").simulate("click");

        // open should be false now
        expect(setOpen).toBeFalsy;
      });
    });

    describe("ConfirmButton", () => {
      it("Should call axios.delete and close the dialog when clicked", () => {
        // click the delete button to set open to true
        wrapper.find("#deleteBtn").simulate("click");
        expect(setOpen).toBeTruthy;

        // mock axios before clicking confirm
        axios.delete.mockImplementationOnce(() => Promise.resolve());

        // click confirm
        wrapper.find("#confirmDeleteBtn").simulate("click");

        // check that axios.delete was called
        expect(axios.delete).toHaveBeenCalled();

        // check that redirect/refresh has been called
        expect(mockHistoryPush).toHaveBeenCalledWith("/Devices");
        expect(mockHistoryGo).toHaveBeenCalledWith(0);

        // open should be false
        expect(setOpen).toBeFalsy;
      });
    });
  });
});
