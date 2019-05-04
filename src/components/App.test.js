import React from "react";
import { create } from "react-test-renderer";
import Rating from "./listing_card/rating";

describe("Rating component", () => {
  test("it matches the snapshot", () => {
    const component = create(<Rating rating="4.9" ratePercent="98%" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});