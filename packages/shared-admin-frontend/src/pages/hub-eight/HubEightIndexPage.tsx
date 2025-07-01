import { useEffect, useState } from "react";
import { Div } from "@client/comps/div/Div";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Button } from "@client/comps/button/Button";
import { getGameList } from "#app/services/hub-eight/api/getGameList";
import { syncGameList } from "#app/services/hub-eight/api/syncGameList";

export const HubEightIndexPage = () => {
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  useEffect(() => {
    getGameList({ category: "live" })
      .then((res) => {
        // console.log
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  });
  const syncGames = () => {
    setSyncing(true);
    syncGameList()
      .then((res) => {
        alert("Completed");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSyncing(false));
  };
  if (loading) return <Div> Loading...</Div>;
  return (
    <SitePage
      className="HolidayIndexPage"
      title="HubEight"
    >
      <Div
        fx
        column
      >
        <Button
          type="submit"
          kind="primary"
          label="Sync Games"
          fx
          disabled={syncing}
          onClick={() => syncGames()}
        />
      </Div>
    </SitePage>
  );
};
