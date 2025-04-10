import { Fragment } from "react";
import { UserCard } from "./UserCard";
import { StatCardGrid } from "./StatCardGrid";

export const ProfileBody = () => {
  return (
    <Fragment>
      <h2>Profile Information</h2>
      <UserCard />
      <StatCardGrid />
    </Fragment>
  );
};
