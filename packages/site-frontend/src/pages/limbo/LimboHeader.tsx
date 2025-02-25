import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { SvgMultiplier } from "@client/svgs/common/SvgMultiplier";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { SvgCog } from "@client/svgs/common/SvgCog";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Dialogs } from "@client/services/dialogs";
import { VolumeDropdown } from "#app/comps/sounds/VolumeDropdown";
import { LimboInfoModal } from "#app/modals/limbo/LimboInfoModal";
import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const LimboHeader = () => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Div>
      <Conditional
        value={mainLayout}
        mobile={<MobileHeader />}
        tablet={<NotMobileHeader />}
        laptop={<NotMobileHeader />}
        desktop={<NotMobileHeader />}
      />
    </Div>
  );
};

const MobileHeader = () => {
  return (
    <Div fx>
      <PageTitle
        heading="Limbo"
        icon={SvgMultiplier}
      />
      <Div gap={8}>
        <VolumeDropdown prefix="limbo" />
        <Dropdown
          type="menu"
          button={
            <Button
              kind="secondary"
              icon={SvgCog}
            />
          }
          options={[
            {
              type: "action",
              label: "Fairness",
              iconLeft: SvgCheckCircle,
              onClick: () =>
                Dialogs.open("primary", <FairnessSeedModal historyTo="/fairness/limbo" />),
            },
            {
              type: "action",
              label: "Rules",
              iconLeft: SvgInfoCircle,
              onClick: () => Dialogs.open("primary", <LimboInfoModal />),
            },
          ]}
        />
      </Div>
    </Div>
  );
};

const NotMobileHeader = () => {
  return (
    <Div fx>
      <PageTitle
        heading="Limbo"
        icon={SvgMultiplier}
      />
      <Div
        fx
        align="flex-start"
        justify="flex-end"
        gap={8}
      >
        <Button
          kind="secondary"
          icon={SvgCheckCircle}
          label="Fairness"
          onClick={() => Dialogs.open("primary", <FairnessSeedModal historyTo="/fairness/limbo" />)}
        />
        <Button
          kind="secondary"
          icon={SvgInfoCircle}
          onClick={() => Dialogs.open("primary", <LimboInfoModal />)}
        />
        <VolumeDropdown prefix="limbo" />
      </Div>
    </Div>
  );
};
