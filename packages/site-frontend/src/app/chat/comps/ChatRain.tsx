import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useCountUp } from "react-countup";
import { useInterval } from "usehooks-ts";
import { isFuture, isPast } from "date-fns";
import { ChatRainDocument } from "@core/types/chat/ChatRainDocument";
import { Dates } from "@core/services/dates";
import { Intimal } from "@core/services/intimal";
import { Div } from "@client/comps/div/Div";
import { Button } from "@client/comps/button/Button";
import { Vector } from "@client/comps/vector/Vector";
import { SvgClock } from "@client/svgs/common/SvgClock";
import { Span } from "@client/comps/span/Span";
import { SvgCoinStack } from "@client/svgs/common/SvgCoinStack";
import { SvgSiteToken } from "@client/svgs/site/SvgSiteToken";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { Dialogs } from "@client/services/dialogs";
import { Lottie } from "#app/comps/lottie/Lottie";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ChatRainJoinModal } from "#app/modals/chat/ChatRainJoinModal";
import { ChatRainInfoModal } from "#app/modals/chat/ChatRainInfoModal";
import { ChatRainTipModal } from "#app/modals/chat/ChatRainTipModal";

export const ChatRain = () => {
  const rain = useAppSelector((x) => x.chat.rain);
  const rainEnabled = useAppSelector((x) => x.site.settings.rainEnabled);

  if (!rain || !rainEnabled) {
    return null;
  }
  return <RainContent rain={rain} />;
};

const RainContent = ({ rain }: { rain: ChatRainDocument }) => {
  const lastRainId = useAppSelector((x) => x.user.meta.lastRainId);
  const rainAmount = rain.totalAmount;
  const joined = lastRainId === rain._id;
  const valueRef = useRef<HTMLElement>(null);
  const { open, timer } = useRainTiming(rain);

  const counter = useCountUp({
    ref: valueRef,
    start: 0,
    end: Intimal.toDecimal(rainAmount),
    delay: 0,
    decimals: 2,
    duration: 1,
  });

  useEffect(() => {
    counter.update(Intimal.toDecimal(rainAmount));
  }, [rainAmount]);

  return (
    <Div>
      <Div
        fx
        px={8}
        py={8}
        bg="brown-6"
        borderBottom
        borderColor={open ? "yellow" : "brown-5"}
      >
        <Div grow>
          <Vector
            as={SvgSiteToken}
            size={24}
            ml={4}
            mr={12}
          />
          <Div column>
            <Span
              forwardRef={valueRef}
              family="title"
              weight="bold"
              color="light-gray"
            >
              {"10.00"}
            </Span>
            <Span size={11}>{"in Rain Pool"}</Span>
          </Div>
        </Div>
        <Div gap={4}>
          {open && (
            <Div
              center
              gap={4}
              mr={4}
            >
              <Vector
                as={SvgClock}
                size={13}
              />
              <Span size={13}>{timer}</Span>
            </Div>
          )}
          {open && (
            <Button
              kind="primary"
              size="xs"
              label={joined ? "Joined" : "Join"}
              labelSize={13}
              width={56}
              disabled={joined}
              onClick={() => Dialogs.open("primary", <ChatRainJoinModal />)}
            />
          )}
          <Button
            kind="secondary"
            size="xs"
            icon={SvgCoinStack}
            data-tooltip-id="app-tooltip"
            data-tooltip-content="Tip Rain"
            onClick={() => Dialogs.open("primary", <ChatRainTipModal />)}
          />
          <Button
            kind="secondary"
            size="xs"
            icon={SvgInfoCircle}
            onClick={() => Dialogs.open("primary", <ChatRainInfoModal />)}
            data-tooltip-id="app-tooltip"
            data-tooltip-content="How it Works"
          />
        </Div>
      </Div>
      {open && (
        <Div
          position="absolute"
          top={48}
          zIndex={1}
          pointerEvents="none"
        >
          <Lottie
            path="/animations/rain-tokens.json"
            loop
          />
        </Div>
      )}
    </Div>
  );
};

function useRainTiming(rain: ChatRainDocument) {
  const { openDate, endDate } = rain;
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState<string>();

  const update = useCallback(() => {
    setOpen(isPast(openDate) && isFuture(endDate));
    setTimer(Dates.toTimerString(endDate));
  }, [openDate, endDate]);

  useLayoutEffect(() => update(), [update]);
  useInterval(() => update(), 1000);

  return { open, timer };
}
