import { FC, useState } from "react";
import { useEventCallback, useLocalStorage } from "usehooks-ts";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { ChestRoll } from "@core/types/chests/ChestRoll";
import { Chests } from "@core/services/chests";
import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { Div } from "@client/comps/div/Div";
import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
import { Style } from "@client/services/style";
import { useSoundPreloader } from "@client/hooks/sounds/useSoundPreloader";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { VerificationModal } from "#app/modals/verification/VerificationModal";
import { ChestLootTable } from "../chest-loot/ChestLootTable";
import { useChestReels } from "../chest-reel/useChestReels";
import { ChestReelBox } from "../chest-reel/ChestReelBox";
import { ChestHeader } from "./ChestHeader";
import { ChestMenu } from "./ChestMenu";
import { DropFeed } from "./DropFeed";
import { DiceHeader } from "#app/pages/dice/DiceHeader";

export type ChestPlayerProps = {
  chest: ChestDocument;
  backTo: string;
  fairnessTo: string;
  descripton?: JSX.Element;
  cost?: (openCount: number) => JSX.Element;
  disableMultiOpen?: boolean;
  onOpen: (
    openCount: number,
    speed: ChestSpeed,
    special: boolean,
  ) => Promise<void | ChestRoll[]>;
};

export const ChestPlayer: FC<ChestPlayerProps> = ({
  chest,
  backTo,
  fairnessTo,
  descripton,
  cost,
  disableMultiOpen,
  onOpen,
}) => {
  const [openCountSaved, setOpenCountSaved] = useLocalStorage(
    "chest-open-count",
    1,
  );
  const [fast, setFast] = useLocalStorage("chest-fast", false);
  const [specialEnabled, setSpecial] = useLocalStorage("chest-special", true);
  const [isLoading, setIsLoading] = useState(false);

  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const openCount = disableMultiOpen ? 1 : openCountSaved;
  const layout = openCount === 1 ? "horizontal" : "vertical";
  const speed = fast ? "turbo" : "slow";

  const volumePrefix = "cases";

  const { Reels, animating, spin } = useChestReels({
    chest,
    layout,
    openCount,
    speed,
    volumePrefix,
  });

  const disableControls = isLoading || animating;

  useSoundPreloader("spin-land", "spin-tick", "confetti-jackpot", "special");

  const handleDemo = useEventCallback(() => {
    const rolls = Array(openCount)
      .fill(0)
      .map(() => Chests.getDemoRoll({ chest, specialEnabled }));
    spin(rolls);
  });

  const handleOpen = usePost(async (isMounted) => {
    if (kycTier < 1) {
      return Dialogs.open("primary", <VerificationModal />);
    }

    const rolls = await onOpen(openCount, speed, specialEnabled);

    if (rolls && isMounted()) {
      spin(rolls);
    }
  }, setIsLoading);

  return (
    <Div
      fx
      column
      gap={24}
    >
      <DiceHeader />
      <Div
        fx
        gap={24}
      >
        <ChestMenu
          chest={chest}
          openCount={openCount}
          fast={fast}
          specialEnabled={specialEnabled}
          cost={cost}
          disableMultiOpen={disableMultiOpen}
          disableControls={disableControls}
          setOpenCount={setOpenCountSaved}
          setFast={setFast}
          setSpecial={setSpecial}
          onDemoClick={handleDemo}
          onOpenClick={handleOpen}
        />
        <ChestReelBox layout={layout}>{Reels}</ChestReelBox>
      </Div>
      <ChestLootTable
          chest={chest}
          layout={mainLayout}
        />
      <DropFeed chest={chest} />
    </Div>
  );
};