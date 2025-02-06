import { Fragment } from "react";
import { UserCard } from "./UserCard";
import { StatCardGrid } from "./StatCardGrid";

export const ProfileBody = () => {
  return (
    <Fragment>
      <UserCard />
      <StatCardGrid />
    </Fragment>
  );
};
