import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { SvgSlide } from "@client/svgs/common/SvgSlide";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { Link } from "@client/comps/link/Link";
import { SvgCog } from "@client/svgs/common/SvgCog";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Dialogs } from "@client/services/dialogs";
import { VolumeDropdown } from "#app/comps/sounds/VolumeDropdown";
import { DoubleInfoModal } from "#app/modals/double/DoubleInfoModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const DoubleHeader = () => {
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
        heading="Double"
        icon={SvgSlide}
      />
      <Div gap={8}>
        <VolumeDropdown prefix="double" />
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
              type: "router",
              to: "/fairness/double",
              label: "Fairness",
              iconLeft: SvgCheckCircle,
            },
            {
              type: "action",
              label: "Rules",
              iconLeft: SvgInfoCircle,
              onClick: () => Dialogs.open("primary", <DoubleInfoModal />),
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
        heading="Double"
        icon={SvgSlide}
      />
      <Div
        fx
        align="flex-start"
        justify="flex-end"
        gap={8}
      >
        <Link
          type="router"
          to="/fairness/double"
          hover="none"
        >
          <Button
            kind="secondary"
            icon={SvgCheckCircle}
            label="Fairness"
          />
        </Link>
        <Button
          kind="secondary"
          icon={SvgInfoCircle}
          onClick={() => Dialogs.open("primary", <DoubleInfoModal />)}
        />
        <VolumeDropdown prefix="double" />
      </Div>
    </Div>
  );
};
