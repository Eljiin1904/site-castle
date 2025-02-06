import { Fragment } from "react";
import { HolidayCaseGrid } from "./HolidayCaseGrid";
import { StoreHeader } from "./StoreHeader";

export const StoreBody = () => {
  return (
    <Fragment>
      <StoreHeader />
      <HolidayCaseGrid />
    </Fragment>
  );
};
