import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";

import { Grid } from "@material-ui/core";
import StreamStatisticsCard from "../StreamStatisticsCard";
import DashboardCard from "../../general/dashboard/DashboardCard";
import SimpleTable from "../../general/simpleTable/SimpleTable";
import { getSampleStreamStats } from "../../api/SampleData";
import ButtonInfo from "../../general/dashboard/ButtonInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamStatisticsCard/> class component", () => {
  let wrapper;
  const dummyStreamId = 1;
  const dummyStats = getSampleStreamStats();

  const expectedProperties = {
    Time: dummyStats.time,
    "Round-Trip-Time": dummyStats.link.rtt,
    "Packets Retransmitted": dummyStats.send.packetsRetransmitted,
    "Packets Dropped": dummyStats.send.packetsDropped
  };

  const expectedButton = new ButtonInfo(
    `/Streams/Details/${dummyStats.id}/Statistics`,
    { statistics: dummyStats },
    "More Statistics"
  );

  beforeEach(() => {
    wrapper = Enzyme.shallow(<StreamStatisticsCard streamId={dummyStreamId} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe("handleStatsChange() function", () => {
    it("should set the stats state", () => {
      const startingState = {
        stats: []
      };
      const expectedState = {
        stats: dummyStats
      };

      expect(wrapper.state()).toStrictEqual(startingState);
      wrapper.instance().handleStatsChange(dummyStats);
      expect(wrapper.state()).toStrictEqual(expectedState);
    });
  });
  describe("getProperties() function", () => {
    it("should return a specific array of properties", () => {
      wrapper.instance().handleStatsChange(dummyStats);
      const actualProperties = wrapper.instance().getProperties();
      expect(actualProperties).toStrictEqual(expectedProperties);
    });
  });
  describe("render() function", () => {
    it("should render 1 DashboardCard with expected props", () => {
      wrapper.instance().handleStatsChange(dummyStats);

      const expectedProps = {
        title: "Statistics",
        button: expectedButton
      };

      const dashCard = wrapper.find(DashboardCard);
      expect(dashCard).toHaveLength(1);

      expect(dashCard.props().title).toBe(expectedProps.title);
      expect(dashCard.props().button).toStrictEqual(expectedProps.button);
    });
    it("should render 2 Grid components", () => {
      expect(wrapper.find(Grid)).toHaveLength(2);
    });
    it("First Grid component should have expected props", () => {
      const expectedProps = { container: true };
      const gridProps = wrapper.find(Grid).at(0).props();
      expect(gridProps.container).toBe(expectedProps.container);
    });
    it("Second Grid component should have expected props", () => {
      const expectedProps = { item: true, xs: 12 };
      const gridProps = wrapper.find(Grid).at(1).props();
      expect(gridProps.item).toBe(expectedProps.item);
      expect(gridProps.xs).toBe(expectedProps.xs);
    });
    it("should render 1 SimpleTable component with expected props", () => {
      wrapper.instance().handleStatsChange(dummyStats);

      const table = wrapper.find(SimpleTable);
      expect(table).toHaveLength(1);

      const tableProps = table.props();
      expect(tableProps.properties).toStrictEqual(expectedProperties);
    });
  });
});