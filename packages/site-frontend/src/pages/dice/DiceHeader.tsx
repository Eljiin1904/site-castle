import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { SvgDice } from "@client/svgs/common/SvgDice";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { SvgCog } from "@client/svgs/common/SvgCog";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Dialogs } from "@client/services/dialogs";
import { VolumeDropdown } from "#app/comps/sounds/VolumeDropdown";
import { DiceInfoModal } from "#app/modals/dice/DiceInfoModal";
import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const DiceHeader = () => {
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
        heading="Dice"
        icon={SvgDice}
      />
      <Div gap={8}>
        <VolumeDropdown prefix="dice" />
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
                Dialogs.open(
                  "primary",
                  <FairnessSeedModal historyTo="/fairness/dice" />,
                ),
            },
            {
              type: "action",
              label: "Rules",
              iconLeft: SvgInfoCircle,
              onClick: () => Dialogs.open("primary", <DiceInfoModal />),
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
        heading="Dice"
        icon={SvgDice}
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
          onClick={() =>
            Dialogs.open(
              "primary",
              <FairnessSeedModal historyTo="/fairness/dice" />,
            )
          }
        />
        <Button
          kind="secondary"
          icon={SvgInfoCircle}
          onClick={() => Dialogs.open("primary", <DiceInfoModal />)}
        />
        <VolumeDropdown prefix="dice" />
      </Div>
    </Div>
  );
};
