import { Fragment } from "react";
import { OverviewBanner } from "./OverviewBanner";
import { FeatureGrid } from "./FeatureGrid";

export const OverviewBody = () => {
  return (
    <Fragment>
      <OverviewBanner />
      <FeatureGrid />
    </Fragment>
  );
};
