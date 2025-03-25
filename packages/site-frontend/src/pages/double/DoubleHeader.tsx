import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { Link } from "@client/comps/link/Link";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Dialogs } from "@client/services/dialogs";
import { VolumeDropdown } from "#app/comps/sounds/VolumeDropdown";
import { DoubleInfoModal } from "#app/modals/double/DoubleInfoModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Vector } from "@client/comps/vector/Vector";
import { DoubleStatus } from "./DoubleStatus";
import { useTranslation } from "@core/services/internationalization/internationalization";

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
    <Div
      fx
      flexFlow="row"
      justify="space-between"
      wrap
      gap={4}
    >
      <Div>
        <DoubleStatus status="Online" />
      </Div>

      <Div gap={4}>
        <Dropdown
          type="menu"
          button={
            <Button kind="tertiary-black-overlay">
              <Vector
                as={SvgInfoCircle}
                color="white"
                size={20}
              />
            </Button>
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
        <VolumeDropdown
          prefix="double"
          kind="tertiary-black-overlay"
          iconColor="white"
        />
      </Div>
    </Div>
  );
};

const NotMobileHeader = () => {
  const {t} = useTranslation();
  return (
    <Div fx>
      <DoubleStatus status="Online" />
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
          <Button kind="tertiary-black-overlay">
            <Vector
              as={SvgCheckCircle}
              color="light-sand"
            />
            <Div color="light-sand">{t("menu.fairness")}</Div>
          </Button>
        </Link>
        <Button
          kind="tertiary-black-overlay"
          onClick={() => Dialogs.open("primary", <DoubleInfoModal />)}
        >
          <Vector
            as={SvgInfoCircle}
            color="light-sand"
          />
        </Button>
        <VolumeDropdown
          prefix="double"
          kind="tertiary-black-overlay"
          iconColor="light-sand"
        />
      </Div>
    </Div>
  );
};
