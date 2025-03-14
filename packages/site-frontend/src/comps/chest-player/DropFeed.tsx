import { memo, useMemo } from "react";
import { Chests } from "@core/services/chests";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgLive } from "@client/svgs/common/SvgLive";
import { usePresence } from "#app/hooks/sockets/usePresence";
import { useStream } from "#app/hooks/sockets/useStream";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { DropCard, DropCardPlaceholder } from "./DropCard";
import "./DropFeed.scss";

export const DropFeed = memo(({ chest }: { chest: ChestDocument }) => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  usePresence({
    joinKey: "chest-drops-join",
    leaveKey: "chest-drops-leave",
    roomKey: chest._id,
  });

  const stream = useStream({
    key: "chest-drops-stream",
    maxLogSize: Chests.dropLogSize,
  });

  const CardsMemo = useMemo(
    () =>
      stream.log.map((x) => (
        <DropCard
          key={x._id}
          drop={x}
          inserted={stream.inserted}
        />
      )),
    [stream],
  );

  return (
    <Div
      className="DropFeed"
      column
      fx
      gap={20}
      mt={layout === "mobile" ? undefined : 8}
    >
      <PageTitle
        heading="Live Drops"
      />
      <Div
        className="drop-list"
        fx
        gap={2}
        overflow="hidden"
      >
        {CardsMemo}
        {!stream.initialized &&
          [...Array(Chests.dropLogSize)].map((x, i) => (
            <DropCardPlaceholder key={i} />
          ))}
      </Div>
    </Div>
  );
});
