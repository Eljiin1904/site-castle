import { Fragment } from "react";
import { DoorGrid } from "./DoorGrid";
import { AdventHeader } from "./AdventHeader";

export const AdventBody = () => {
  return (
    <Fragment>
      <AdventHeader />
      <DoorGrid />
    </Fragment>
  );
};
