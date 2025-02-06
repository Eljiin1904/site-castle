import { Numbers } from "@core/services/numbers";
import { MarketInventoryItem } from "@core/types/market/MarketInventoryDocument";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Span } from "@client/comps/span/Span";
import { Tokens } from "@client/comps/tokens/Tokens";
import { SvgDeposit } from "@client/svgs/common/SvgDeposit";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const DepositHeader = ({ items }: { items: MarketInventoryItem[] }) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const totalCount = items.length;
  const totalValue = items.reduce((acc, x) => (acc += x.bestPrice), 0);

  return (
    <Div fx>
      <PageTitle
        icon={SvgDeposit}
        heading="Deposit Skins"
      />
      <Conditional
        value={layout}
        mobile={
          <MobileContent
            totalCount={totalCount}
            totalValue={totalValue}
          />
        }
        tablet={
          <NotMobileContent
            totalCount={totalCount}
            totalValue={totalValue}
          />
        }
        laptop={
          <NotMobileContent
            totalCount={totalCount}
            totalValue={totalValue}
          />
        }
        desktop={
          <NotMobileContent
            totalCount={totalCount}
            totalValue={totalValue}
          />
        }
      />
    </Div>
  );
};

const MobileContent = ({
  totalCount,
  totalValue,
}: {
  totalCount: number;
  totalValue: number;
}) => {
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
          {Numbers.toLocaleString(totalCount, 0)}
        </Span>
        <Span
          size={12}
          color="light-gray"
        >
          {" items worth"}
        </Span>
      </Div>
      <Tokens
        value={totalValue}
        fontSize={12}
        ml={4}
      />
    </Div>
  );
};

const NotMobileContent = ({
  totalCount,
  totalValue,
}: {
  totalCount: number;
  totalValue: number;
}) => {
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
          {Numbers.toLocaleString(totalCount, 0)}
        </Span>
        <Span color="light-gray">{" items worth"}</Span>
      </Div>
      <Tokens
        value={totalValue}
        ml={4}
      />
    </Div>
  );
};
