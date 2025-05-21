import "./BlackjackPlacement.scss";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { BlackjackBetType } from "@core/types/blackjack/BlackjackBetAmounts";
import { BlackjackHiddenInput, HiddenInputAlign } from "#app/pages/blackjack/BlackjackHiddenInput";
import { getChipValsFromAmount } from "./utils/getChipValsFromAmount";
import classNames from "classnames";
import { Intimal } from "#core/services/intimal";
import { addBetTypeAmounts, setBetTypeAmount } from "#app/services/blackjack/redux/blackjackSlice";
import { BlackjackPlacementChip } from "./BlackjackPlacementChip";
import { useDisplayBetAmount } from "./useDisplayBetAmount";
import { Toasts } from "#client/services/toasts";
import { store } from "#app/store";
import { setWarnBetTotal } from "./helpers/setWarnBetTotal";
import { getWarnBetItems } from "./helpers/getWarnBetItems";
import { getRandomChipSound } from "./utils/blackjackSounds";
import { useSoundPlayer } from "#client/hooks/sounds/useSoundPlayer";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
// import { useDisplayBetAmount } from "./useDisplayBetAmount";

export const BlackjackPlacement = ({
  index,
  betType,
  title,
  size = "",
}: {
  index: number;
  betType: BlackjackBetType;
  title: string;
  size?: "large" | "";
}) => {
  const dispatch = useDispatch();
  const playSound = useSoundPlayer("blackjack");
  const total = useDisplayBetAmount(betType);
  const authenticated = useAppSelector((x) => x.user.authenticated);

  const blackjack15x = useAppSelector((x) => x.site.settings.blackjackBlackjack15xEnabled);
  const _213 = useAppSelector((x) => x.site.settings.blackjack213Enabled);
  const perfectPairs = useAppSelector((x) => x.site.settings.blackjackPerfectPairsEnabled);
  const luckyLadies = useAppSelector((x) => x.site.settings.blackjackLuckyLadiesEnabled);

  const onSelect = useCallback(() => {
    if (!blackjack15x && betType === "blackjack-15x") {
      return void Toasts.warning("Blackjack 15x is disabled");
    }
    if (!_213 && betType === "21+3") {
      return void Toasts.warning("21+3 is disabled");
    }
    if (!perfectPairs && betType === "perfect-pairs") {
      return void Toasts.warning("Perfect Pairs is disabled");
    }
    if (!luckyLadies && betType === "lucky-ladies") {
      return void Toasts.warning("Lucky Ladies is disabled");
    }

    if (!authenticated) {
      return void Toasts.warning("Please login to place a bet");
    }
    const selectedValue = store.getState().blackjack.betting.selectedValue;
    if (selectedValue === null) {
      return void Toasts.warning("Please select a chip first");
    }
    playSound(getRandomChipSound());
    let amount = Intimal.fromDecimal(selectedValue);
    const items = getWarnBetItems({ betType, amount });
    dispatch(addBetTypeAmounts(items));
  }, [betType, authenticated, blackjack15x, _213, perfectPairs, luckyLadies]);

  const onChange = useCallback(
    (val: number) => {
      if (!authenticated) {
        return void Toasts.warning("Please login to place a bet");
      }
      const amount = setWarnBetTotal({ betType, amount: val });
      dispatch(setBetTypeAmount({ betType, amount }));
    },
    [authenticated, betType],
  );

  const stack = getChipValsFromAmount(total).reverse();
  let inputAlign: HiddenInputAlign = "center";
  if (index == 1) inputAlign = "left";
  if (index == 2) inputAlign = "left";
  if (index == 3) inputAlign = "right";
  if (index == 4) inputAlign = "right";

  const transparent = ["blackjack-15x", "perfect-pairs"].includes(betType) && stack.length > 20;

  const className = classNames(
    "BlackjackPlacement",
    "index-" + index,
    size,
    total > 0 ? "has-chips" : "no-chips",
    {
      transparent,
    },
  );

  return (
    <div
      className={className}
      onClick={onSelect}
    >
      <div className="Placement_inner">
        <div className="circle">
          <div className="circle-outer">
            <div className="circle-inner" />
          </div>
          <div className="circle-outline" />
        </div>
        <div className={"chip-stack" + (transparent ? " transparent" : "")}>
          {stack.map((val, i) => (
            <BlackjackPlacementChip
              key={`${val}-${i}`} // unique keys will get animated in
              value={val}
              displayVal={i === stack.length - 1 ? Intimal.toDecimal(total) : null}
            />
          ))}
        </div>

        {/* displayed when chips are in the middle */}
        <Info
          title={title}
          initValue={Intimal.toDecimal(total).toString()}
          align={inputAlign}
          onChange={onChange}
        />

        {/* displayed when chips move to corner */}
        <Info
          title={title}
          initValue={Intimal.toDecimal(total).toString()}
          align={"center"}
          hidden={true}
        />
      </div>
    </div>
  );
};

function Info({
  title,
  initValue,
  align,
  onChange,
  hidden = false,
}: {
  title: string;
  initValue: string;
  align: HiddenInputAlign;
  onChange?: (val: number) => void;
  hidden?: boolean;
}) {
  const className = ["BlackjackInfo", align, hidden ? "hidden" : "visible"].join(" ");

  return (
    <div className={className}>
      {/* <div
        className="title"
        dangerouslySetInnerHTML={{ __html: newTitle }}
      ></div> */}
      <div className="title">{title}</div>
      {!hidden ? null : (
        <div className="amount">
          <BlackjackHiddenInput
            initValue={initValue}
            align={align}
            onChange={onChange ? onChange : () => {}}
          />
        </div>
      )}
    </div>
  );
}
