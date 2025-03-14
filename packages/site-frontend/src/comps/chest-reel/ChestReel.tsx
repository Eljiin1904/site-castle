import { Fragment, memo, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { ChestLayout } from "@core/types/chests/ChestLayout";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { ChestRoll } from "@core/types/chests/ChestRoll";
import { Div } from "@client/comps/div/Div";
import { Chests } from "#app/services/chests";
import { ChestReelCard } from "./ChestReelCard";
import { useItemSize } from "./useItemSize";
import { useSpin } from "./useSpin";
import "./ChestReel.scss";
import { ChestOverlay } from "./ChestOverlay";

const lootIndex = 27;

export const ChestReel = memo(
  ({
    index,
    chest,
    layout,
    speed,
    rolls,
    spinId,
    setAnimating,
    volumePrefix,
  }: {
    index: number;
    chest: ChestDocument;
    layout: ChestLayout;
    speed: ChestSpeed;
    rolls: ChestRoll[];
    spinId: number;
    setAnimating: (x: boolean) => void;
    volumePrefix: string;
  }) => {
    const itemSize = useItemSize(layout);
    const lastSpin = useRef(spinId);

    const roll = rolls[index];
    const { origin } = Chests.getReelPositions({ itemSize, roll });

    const [items, setItems] = useState(Chests.createDemoReel(chest));
    const [jackpot, setJackpot] = useState(false);
    const [popout, setPopout] = useState(false);

    const { ref, handleSpin } = useSpin(volumePrefix);

    useEffect(() => {
      if (lastSpin.current === spinId) return;
      if (!roll) return;

      lastSpin.current = spinId;

      let masterIndex = rolls.findIndex((x) => x.specialSpin);

      if (masterIndex === -1) {
        masterIndex = 0;
      }

      handleSpin({
        chest,
        speed,
        itemSize,
        axis: layout === "vertical" ? "y" : "x",
        master: index === masterIndex,
        roll,
        rolls,
        setAnimating,
        setItems,
        setJackpot,
        setPopout,
      });
    });

    const ItemsMemo = useMemo(
      () =>
        items.filter(it => it !== undefined).map((x, i) => (
          <ChestReelCard
            key={i}
            index={i}
            item={x}
            roll={roll}
            popout={popout && i === lootIndex}
            fade={popout && i !== lootIndex}
          />
        )),
      [items, popout, roll],
    );

    return (<Fragment>
      <ChestOverlay position={layout === 'vertical' ? 'top': 'left'} />
      <Div
        className={classNames("ChestReel", {
          [`layout-${layout}`]: layout,
          jackpot,
        })}
        fx
        center
        overflow="hidden"
        style={{ "--slide-size": `${itemSize}px`,
        minHeight: "495px",
        maxHeight:`495pxpx`,
    }}
      >
        <Div
          forwardRef={ref}
          className="inner-content"
          style={{
            transform:
              layout === "vertical"
                ? `translateY(${origin}px)`
                : `translateX(${origin}px)`,
          }}
        >
          {ItemsMemo}
        </Div>
      </Div>
        <ChestOverlay position={layout === 'vertical' ? 'bottom': 'right'} />
        </Fragment>
    );
  },
);
