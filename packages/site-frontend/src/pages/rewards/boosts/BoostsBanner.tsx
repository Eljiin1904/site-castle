import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { PageBanner } from "#app/comps/site-page/PageBanner";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { RewardBoostInfoModal } from "#app/modals/rewards/RewardBoostInfoModal";

export const BoostsBanner = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <PageBanner
      image="/graphics/rewards-boosts-banner"
      heading="Boosts"
      description="Win big with your balance boost!"
      content={
        <Div
          align="center"
          gap={small ? 8 : 12}
        >
          <Button
            kind="secondary"
            icon={SvgInfoCircle}
            label="How it Works"
            onClick={() => Dialogs.open("primary", <RewardBoostInfoModal />)}
          />
        </Div>
      }
    />
  );
};
