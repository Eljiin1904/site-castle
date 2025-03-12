import { useState } from "react";
import { Admin } from "#app/services/admin";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { usePost } from "@client/hooks/system/usePost";
import { Toasts } from "@client/services/toasts";

export const ScriptMenu = () => {
  const [loading, setLoading] = useState(false);

  const handleTransactionReports = usePost(async () => {
    await Admin.regenTransactionReports();
    Toasts.success("Regen started.");
  }, setLoading);

  const handleUserReports = usePost(async () => {
    await Admin.regenUserReports();
    Toasts.success("Regen started.");
  }, setLoading);

  const handleAffiliateReports = usePost(async () => {
    await Admin.regenAffiliateReports();
    Toasts.success("Regen started.");
  }, setLoading);

  return (
    <Div
      fx
      column
      gap={16}
    >
      <Div
        fx
        align="center"
      >
        <Div grow>
          <Heading>{"Scripts"}</Heading>
        </Div>
      </Div>
      <Div
        fx
        column
        gap={16}
      >
        <Button
          kind="secondary"
          label="Regen Transaction Reports"
          disabled={loading}
          onClick={handleTransactionReports}
        />
        <Button
          kind="secondary"
          label="Regen User Reports"
          disabled={loading}
          onClick={handleUserReports}
        />
        <Button
          kind="secondary"
          label="Regen Affiliate Reports"
          disabled={loading}
          onClick={handleAffiliateReports}
        />
      </Div>
    </Div>
  );
};
