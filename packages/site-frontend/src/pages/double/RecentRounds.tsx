import { Div } from "@client/comps/div/Div";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { DoubleIcon } from "./DoubleIcon";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const RecentRounds = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Conditional
      value={layout}
      mobile={<LaptopDesktopContent />}
      tablet={<LaptopDesktopContent />}
      laptop={<LaptopDesktopContent />}
      desktop={<LaptopDesktopContent />}
    />
  );
};

const LaptopDesktopContent = () => {
  const history = useAppSelector((x) => x.double.history);
  const {t} = useTranslation(["common"]);
  const small = useIsMobileLayout();

  return (
    <Div
      gap={12}
      column
      data-tooltip-id="app-tooltip"
      data-tooltip-content={t('common:recentRolls')}
      cursor="pointer"
    >
      <Div gap={8}>
        {history.slice(0, small ? 8 : 10).map((x, i) => (
          <DoubleIcon
            key={i}
            betKind={x.color === "yellow" ? "bait" : x.color}
            bait={x.bait}
          />
        ))}
      </Div>
    </Div>
  );
};
