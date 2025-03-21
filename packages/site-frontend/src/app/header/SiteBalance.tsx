import { useEffect, useRef } from "react";
import { useCountUp } from "react-countup";
import { Intimal } from "@core/services/intimal";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { Vector } from "@client/comps/vector/Vector";
import { SvgMoney } from "@client/svgs/common/SvgMoney";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { WalletModal } from "#app/modals/wallet/WalletModal";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";

export const SiteBalance = () => {
  const tokens = useAppSelector((x) => x.user.tokenBalance);
  const valueRef = useRef<HTMLElement>(null);
  const initTokens = useRef(tokens);
  const small = useIsMobileLayout();
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
    <Div className="SiteBalance"
    position={"absolute"}
    >
      <Div
        align="center"
        justify="flex-end"
      >
        <Div gap={4} cursor="pointer" border borderColor="brown-4" height={32} flexCenter px={12} onClick={() => Dialogs.open("primary", <WalletModal />)}>
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
            {Intimal.toLocaleString(tokens)}
          </Span>
          <Vector
            className="icon"
            color="dark-sand"
            as={SvgArrowRight}
            size={12}
          />
        </Div>
        <Div
          align="center"
        >
          <Span size={40} width={1}>&nbsp;</Span>
          <Button
            className="wallet-button"
            kind="primary-yellow"
            size="sm"
            label="Wallet"
            onClick={() => Dialogs.open("primary", <WalletModal />)}
          />
        </Div>
      </Div>
    </Div>
  );
};
