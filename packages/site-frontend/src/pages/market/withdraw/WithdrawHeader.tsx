import { Numbers } from "@core/services/numbers";
import { Intimal } from "@core/services/intimal";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { SvgWithdraw } from "@client/svgs/common/SvgWithdraw";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const WithdrawHeader = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Div fx>
      <PageTitle
        icon={SvgWithdraw}
        heading="Withdraw Skins"
      />
      <Conditional
        value={layout}
        mobile={<MobileContent />}
        tablet={<NotMobileContent />}
        laptop={<NotMobileContent />}
        desktop={<NotMobileContent />}
      />
    </Div>
  );
};

const MobileContent = () => {
  const market = useAppSelector((x) => x.site.meta.market);

  return (
    <Div
      fx
      column
      align="flex-end"
      justify="center"
    >
      <Div display="block">
        <Span
          family="title"
          weight="bold"
          color="white"
          size={12}
        >
          {Numbers.toLocaleString(market.totalCount, 0)}
        </Span>
        <Span
          size={12}
          color="light-gray"
        >
          {" items worth"}
        </Span>
      </Div>
      <Tokens
        value={Intimal.fromDecimal(market.totalUsd * 2)}
        decimals={0}
        fontSize={12}
        ml={4}
      />
    </Div>
  );
};

const NotMobileContent = () => {
  const market = useAppSelector((x) => x.site.meta.market);

  return (
    <Div
      fx
      align="center"
      justify="flex-end"
    >
      <Div display="block">
        <Span
          family="title"
          weight="bold"
          color="white"
        >
          {Numbers.toLocaleString(market.totalCount, 0)}
        </Span>
        <Span color="light-gray">{" items worth"}</Span>
      </Div>
      <Tokens
        value={Intimal.fromDecimal(market.totalUsd * 2)}
        decimals={0}
        ml={4}
      />
    </Div>
  );
};
