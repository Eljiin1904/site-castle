import { useEffect, useRef } from "react";
import { useCountUp } from "react-countup";
import { Intimal } from "@core/services/intimal";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { Vector } from "@client/comps/vector/Vector";
import { SvgAddFunds } from "@client/svgs/common/SvgAddFunds";
import { SvgDivider } from "@client/svgs/common/SvgDivider";
import { SvgMoney } from "@client/svgs/common/SvgMoney";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { WalletModal } from "#app/modals/wallet/WalletModal";

export const SiteBalance = () => {
  const tokens = useAppSelector((x) => x.user.tokenBalance);
  const valueRef = useRef<HTMLElement>(null);
  const initTokens = useRef(tokens);

  const counter = useCountUp({
    ref: valueRef,
    start: Intimal.toDecimal(initTokens.current),
    end: Intimal.toDecimal(tokens),
    delay: 0,
    decimals: 2,
    duration: 1,
    startOnMount: false,
  });

  useEffect(() => {
    if (tokens !== initTokens.current) {
      counter.update(Intimal.toDecimal(tokens));
    }
  }, [tokens]);

  return (
    <Div className="SiteBalance">
      <Div
        align="center"
        justify="flex-end"
      >
        <Div gap={4}>
          <Vector
            className="icon"
            color="white"
            as={SvgMoney}
            size={14}
          />
          <Span
            forwardRef={valueRef}
            family="title"
            color="white"
          >
            5000{/* {Intimal.toLocaleString(tokens)} */}
          </Span>
        </Div>
        <Div
          gap={16}
          align="center"
        >
          <Span size={40} width={1}>&nbsp;</Span>
          <Button
            className="wallet-button"
            icon={SvgAddFunds}
            kind="secondary"
            size="sm"
            onClick={() => Dialogs.open("primary", <WalletModal />)}
          />
          <Vector as={SvgDivider} px={8} />
        </Div>
      </Div>
    </Div>
  );
};
