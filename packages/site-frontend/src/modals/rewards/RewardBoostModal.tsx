import { useState } from "react";
import classNames from "classnames";
import { Strings } from "@core/services/strings";
import { RewardBoostTimeframe } from "@core/types/rewards/RewardBoostTimeframe";
import { Modal } from "@client/comps/modal/Modal";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Img } from "@client/comps/img/Img";
import { Div } from "@client/comps/div/Div";
import { useMount } from "@client/hooks/system/useMount";
import { usePost } from "@client/hooks/system/usePost";
import { Utility } from "@client/services/utility";
import { Tokens } from "@client/comps/tokens/Tokens";
import { ModalField } from "@client/comps/modal/ModalField";
import { Span } from "@client/comps/span/Span";
import { Heading } from "@client/comps/heading/Heading";
import { useSoundPreloader } from "@client/hooks/sounds/useSoundPreloader";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { SvgTimes } from "@client/svgs/common/SvgTimes";
import { Vector } from "@client/comps/vector/Vector";
import { Toasts } from "@client/services/toasts";
import { Rewards } from "#app/services/rewards";
import { RewardBoostFailModal } from "./RewardBoostFailModal";
import "./RewardBoostModal.scss";

export const RewardBoostModal = ({
  timeframe,
  onSuccess,
}: {
  timeframe: RewardBoostTimeframe;
  onSuccess: () => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(0);
  const playSound = useSoundPlayer("rewards");

  const handleClaim = usePost(
    async () => {
      const startTime = Date.now();
      const { amount } = await Rewards.boost({ timeframe });

      await Utility.wait(startTime + 3000 - Date.now());

      if (amount === 0) {
        Dialogs.open("primary", <RewardBoostFailModal />);
      } else {
        playSound("boost");
        setAmount(amount);
        onSuccess();
      }
    },
    setLoading,
    (err) => {
      Toasts.error(err);
      Dialogs.close("primary");
    },
  );

  useMount(() => handleClaim());

  useSoundPreloader("boost");

  return (
    <Modal
      className="RewardBoostModal"
      width="sm"
      disableBackdrop={loading}
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalBody justify="center">
        <Heading size={24}>{`${Strings.capitalize(timeframe)} Boost`}</Heading>
        <Div
          className="boost-box"
          center
        >
          <Img
            className={classNames("boost-icon", {
              bounce: loading,
            })}
            type="png"
            path={`/graphics/rewards-boost-${timeframe}`}
            width="200px"
          />
        </Div>
        <ModalField
          center
          borderColor={loading ? "brown-5" : "green"}
        >
          {loading ? (
            <Span size={18}>{"Charging..."}</Span>
          ) : (
            <Tokens
              value={amount}
              fontSize={18}
              accent="positive"
            />
          )}
        </ModalField>
        {!loading && (
          <Vector
            as={SvgTimes}
            size={16}
            position="absolute"
            right={12}
            top={12}
            hover="highlight"
            onClick={() => Dialogs.close("primary")}
          />
        )}
      </ModalBody>
    </Modal>
  );
};
