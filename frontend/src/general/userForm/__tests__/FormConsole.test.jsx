import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Button, Container, TextField } from "@material-ui/core";
import FormConsole from "../FormConsole";

Enzyme.configure({ adapter: new Adapter() });

describe("<FormConsole />", () => {
  let wrapper;
  const mockHandleSubmit = jest.fn();
  const dummyValues = {
    handleSubmit: mockHandleSubmit,
    buttonName: "Create"
  };

  beforeEach(() => {
    wrapper = Enzyme.mount(
      <FormConsole
        handleSubmit={dummyValues.handleSubmit}
        buttonName={dummyValues.buttonName}
        isValidate
        isCreateUser
      />
    );
  });

  describe("render()", () => {
    it("should have the correct components", () => {
      expect(wrapper.find(Container)).toHaveLength(1);
      expect(wrapper.find(TextField)).toHaveLength(2);
      expect(wrapper.find(Button)).toHaveLength(1);
    });
    it("if isValidate is true, it should have the form's noValidate to true", () => {
      const wrapperIsValidate = Enzyme.mount(
        <FormConsole
          handleSubmit={dummyValues.handleSubmit}
          buttonName={dummyValues.buttonName}
          isValidate
        />
      );
      expect(wrapperIsValidate.find("form").prop("noValidate")).toBe(false);
    });
    describe("if isCreateUser is true, it should have the password TextField to have error, inputProps and helperText props", () => {
      const wrapperIsCreate = Enzyme.mount(
        <FormConsole
          handleSubmit={dummyValues.handleSubmit}
          buttonName={dummyValues.buttonName}
          isCreateUser
        />
      );
      const textField = wrapperIsCreate.find(TextField).at(1);
      const passwordState = wrapperIsCreate.state().password;
      it("error should be passed password.length < 5 && password.length > 0", () => {
        expect(textField.prop("error")).toBe(
          passwordState.length < 5 && passwordState.length > 0
        );
      });
      it("inputProps should be passed { maxLength: 20, minLength: 5 }", () => {
        expect(textField.prop("inputProps")).toEqual({
          maxLength: 20,
          minLength: 5
        });
      });
      it("helperText should be equal to Password must be between 5 to 20 characters", () => {
        expect(textField.prop("helperText")).toEqual(
          "Password must be between 5 to 20 characters"
        );
      });
    });
    it("contains the props buttonName as a child of Button", () => {
      expect(wrapper.find(Button).children().text()).toEqual(
        dummyValues.buttonName
      );
    });
  });
  it("setUsername() should set the state username", () => {
    const initialUsername = "initialUser";
    wrapper.setState({ username: initialUsername });
    const expectedUsername = "test";
    wrapper.instance().setUsername(expectedUsername);
    expect(wrapper.state().username).toBe(expectedUsername);
  });
  it("setPassword() should set the state password", () => {
    const initialPassword = "initialPassword";
    wrapper.setState({ password: initialPassword });
    const expectedPassword = "test";
    wrapper.instance().setPassword(expectedPassword);
    expect(wrapper.state().password).toBe(expectedPassword);
  });
  describe("onSubmit()", () => {
    const targetValue = "test";
    const event = {
      target: {
        value: targetValue
      },
      preventDefault: jest.fn()
    };
    it("should have the passed function handleSubmit be called with username and password state", () => {
      wrapper.instance().onSubmit(event);
      expect(mockHandleSubmit).toHaveBeenCalledWith(
        wrapper.state().username,
        wrapper.state().password
      );
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});
