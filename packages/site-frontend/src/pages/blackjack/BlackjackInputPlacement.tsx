import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { BlackjackBetType } from "@core/types/blackjack/BlackjackBetAmounts";
import { Intimal } from "@core/services/intimal";
import { addBetTypeAmounts, setBetTypeAmount } from "#app/services/blackjack/redux/blackjackSlice";
import { useDisplayBetAmount } from "./useDisplayBetAmount";
import { Toasts } from "@client/services/toasts";
import { setWarnBetTotal } from "./helpers/setWarnBetTotal";
import { getWarnBetItems } from "./helpers/getWarnBetItems";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Input } from "@client/comps/input/Input";
import { SvgDollarSign } from "@client/svgs/common/SvgDollarSign";
import { useProcessing } from "#app/services/blackjack/Blackjack";
import { Div } from "@client/comps/div/Div";

export const BlackjackInputPlacement = ({
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
  const total = useDisplayBetAmount(betType);
  const [blackjackBetAmount, setBlackjackBetAmount] = useState<number>(0);

  const authenticated = useAppSelector((x) => x.user.authenticated);
  const processing = useProcessing();

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

    let amount = Intimal.fromDecimal(blackjackBetAmount);
    const items = getWarnBetItems({ betType, amount });
    dispatch(addBetTypeAmounts(items));
  }, [betType, authenticated, blackjack15x, _213, perfectPairs, luckyLadies]);

  const onChange = useCallback(
    (val: number) => {
      if (!authenticated) {
        return void Toasts.warning("Please login to place a bet");
      }
      setBlackjackBetAmount(val);
      const amount = setWarnBetTotal({ betType, amount: val });
      dispatch(setBetTypeAmount({ betType, amount }));
    },
    [authenticated, betType],
  );

  return (
    <Div
      onClick={onSelect}
      width={"full"}
    >
      <ModalSection justifyContent="space-between">
        <ModalLabel
          width={"full"}
          justifyContent="center"
        >
          {title}
        </ModalLabel>
        <Input
          type="decimal"
          decimals={2}
          iconLeft={SvgDollarSign}
          iconColor="dark-sand"
          placeholder={title}
          value={Intimal.toDecimal(total)}
          disabled={processing}
          onChange={onChange}
        />
      </ModalSection>
    </Div>
  );
};
