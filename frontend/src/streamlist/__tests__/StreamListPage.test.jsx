import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";
import StreamListPage from "../StreamListPage";
import DetailedStreamsTableWrapper from "../DetailedStreamsTableWrapper";
import Page from "../../general/Page";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamListPage/> Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = Enzyme.shallow(<StreamListPage />);
  });

  describe("Should contain the following components", () => {
    it("Contains 1 <Page/> component with correct props", () => {
      expect(wrapper.find(Page)).toHaveLength(1);
      const expectedTitle = "Active Streams";
      const expectedBreadcrumb = [
        ["Home", "/Home"],
        ["Active Streams", "/Streams"]
      ];

      const page = wrapper.find(Page).first();
      expect(page.props().title).toBe(expectedTitle);

      expect(page.props().breadcrumbs).toStrictEqual(expectedBreadcrumb);
    });
    it("Contains 1 <DetailedStreamsTableWrapper/> component", () => {
      expect(wrapper.find(DetailedStreamsTableWrapper)).toHaveLength(1);
    });
  });
});
