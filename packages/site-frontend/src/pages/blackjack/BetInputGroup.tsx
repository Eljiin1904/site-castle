import { Intimal } from "@core/services/intimal";
import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { Button } from "@client/comps/button/Button";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { entries, values } from "@core/services/utility/Utility";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useCallback, useEffect, useState } from "react";
import {
  addBetTypeAmounts,
  setBetTypeAmount,
  useProcessing,
} from "#app/services/blackjack/Blackjack";
import { getWarnBetItems } from "./helpers/getWarnBetItems";
import { Toasts } from "@client/services/toasts";
import { setWarnBetTotal } from "./helpers/setWarnBetTotal";
import { useDisplayBetAmount } from "./useDisplayBetAmount";
import { BlackjackBetType } from "@core/types/blackjack/BlackjackBetAmounts";
import { SvgDollarSign } from "@client/svgs/common/SvgDollarSign";
import { store } from "#app/store";

export const BetInputGroup = ({
  disabled,
  betType,
  title,
}: {
  disabled?: boolean;
  betType: BlackjackBetType;
  title: string;
}) => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const tokenBalance = useAppSelector((x) => x.user.tokenBalance);
  const betAmounts = useAppSelector((state) => state.blackjack.betting.betAmounts);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const layout = useAppSelector((x) => x.style.mainLayout);

  const sm = layout === "mobile";
  const md = layout === "tablet";

  const total = useDisplayBetAmount(betType);
  const [blackjackBetAmount, setBlackjackBetAmount] = useState<number>(0);

  const processing = useProcessing();

  const blackjack15x = useAppSelector((x) => x.site.settings.blackjackBlackjack15xEnabled);
  const _213 = useAppSelector((x) => x.site.settings.blackjack213Enabled);
  const perfectPairs = useAppSelector((x) => x.site.settings.blackjackPerfectPairsEnabled);
  const luckyLadies = useAppSelector((x) => x.site.settings.blackjackLuckyLadiesEnabled);
  useEffect(() => {
    entries(betAmounts).map(([entryBetType, val]) => {
      if (betType == entryBetType) {
        setBlackjackBetAmount(Intimal.toDecimal(val));
        const amount = setWarnBetTotal({ betType, amount: Intimal.toDecimal(val) });
        dispatch(setBetTypeAmount({ betType, amount }));
      }
    });
  }, []);
  const handleMath = (f: (x: number) => number) => {
    let value = f(blackjackBetAmount || 0);

    setBlackjackBetAmount(value);
    const amount = setWarnBetTotal({ betType, amount: value });
    dispatch(setBetTypeAmount({ betType, amount }));
  };

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
      <ModalSection>
        <ModalLabel>{title}</ModalLabel>
        <Div
          // align="center"
          flow={sm || md ? "row" : "column"}
        >
          <Input
            type="decimal"
            width={"full"}
            decimals={2}
            iconLeft={SvgDollarSign}
            iconColor="dark-sand"
            placeholder={title}
            value={Intimal.toDecimal(total)}
            disabled={processing}
            onChange={onChange}
          />
          <Div
            width={"full"}
            // grow
          >
            <Button
              kind="tertiary-grey"
              label="1/2"
              flexGrow
              disabled={processing}
              onClick={() => handleMath((x) => x / 2)}
              size="xssso"
            />
            <Button
              kind="tertiary-grey"
              label="2X"
              flexGrow
              disabled={processing}
              onClick={() => handleMath((x) => x * 2)}
              size="xssso"
            />
            <Button
              kind="tertiary-grey"
              label="MAX"
              // width={40}
              flexGrow
              disabled={processing}
              onClick={() => onChange(tokenBalance)}
              size="xssso"
            />
          </Div>
        </Div>
      </ModalSection>
    </Div>
  );
};
