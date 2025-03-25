import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LastRoundCounter } from "#app/pages/double/LastRoundCounter";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const LastRounds = () => {
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
  
  const {t} = useTranslation(["common"]);
  return (
    <Div
      gap={16}
      cursor="pointer"
    >
      <Span color="dark-sand" size={12} lineHeight={20} weight="medium">{t('common:last100')}</Span>
      <Div gap={8}>
        <LastRoundCounter
          color="green"
          bait={false}
        />
        <LastRoundCounter
          color="black"
          bait={false}
        />
        <LastRoundCounter
          color="yellow"
          bait={false}
        />
        <LastRoundCounter
          color="red"
          bait={false}
        />
      </Div>
    </Div>
  );
};
