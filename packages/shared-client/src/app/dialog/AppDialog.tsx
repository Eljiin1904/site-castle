import { useState, useEffect, Fragment } from "react";
import { Dialogs } from "#client/services/dialogs";

export const AppDialog = () => {
  const [primary, setPrimary] = useState(Dialogs.manager.primary);
  const [secondary, setSecondary] = useState(Dialogs.manager.secondary);

  useEffect(() => {
    const handler = (value: JSX.Element | null) => setPrimary(value);
    Dialogs.manager.on("primary-change", handler);
    return () => {
      Dialogs.manager.off("primary-change", handler);
    };
  });

  useEffect(() => {
    const handler = (value: JSX.Element | null) => setSecondary(value);
    Dialogs.manager.on("secondary-change", handler);
    return () => {
      Dialogs.manager.off("secondary-change", handler);
    };
  });

  return (
    <Fragment>
      {primary}
      {secondary}
    </Fragment>
  );
};
