import { Button } from "#client/comps/button/Button";
import { Conditional } from "#client/comps/conditional/Conditional";
import { Div } from "#client/comps/div/Div";
import { SvgCheckCircle } from "#client/svgs/common/SvgCheckCircle";
import { SvgInfoCircle } from "#client/svgs/common/SvgInfoCircle";
import { SvgBomb } from "#client/svgs/common/SvgBomb";
import { SvgCog } from "#client/svgs/common/SvgCog";
import { Dropdown } from "#client/comps/dropdown/Dropdown";
import { PageTitle } from "#client/comps/page/PageTitle";
import { Dialogs } from "#client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { MinesInfoModal } from "#app/modals/mines/MinesInfoModal";
import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";
import { VolumeDropdown } from "#app/comps/sounds/VolumeDropdown";

export const MinesHeader = () => {
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
        heading="Mines"
        icon={SvgBomb}
      />
      <Div gap={8}>
        <VolumeDropdown prefix="mines" />
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
                Dialogs.open("primary", <FairnessSeedModal historyTo="/fairness/mines" />),
            },
            {
              type: "action",
              label: "Rules",
              iconLeft: SvgInfoCircle,
              onClick: () => Dialogs.open("primary", <MinesInfoModal />),
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
        heading="Mines"
        icon={SvgBomb}
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
          onClick={() => Dialogs.open("primary", <FairnessSeedModal historyTo="/fairness/mines" />)}
        />
        <Button
          kind="secondary"
          icon={SvgInfoCircle}
          onClick={() => Dialogs.open("primary", <MinesInfoModal />)}
        />
        <VolumeDropdown prefix="mines" />
      </Div>
    </Div>
  );
};
