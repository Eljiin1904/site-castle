import { VolumeDropdown } from "#app/comps/sounds/VolumeDropdown";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";
import { Blackjack } from "#app/services/blackjack";
import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Dialogs } from "@client/services/dialogs";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { Fragment, useCallback } from "react";
import { BlackjackInfoModal } from "./modals/BlackjackInfoModal";
import { BlackjackDebugModal } from "./modals/BlackjackDebugModal";
import config from "#app/config";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { BlackjackBetTotals } from "./BlackjackBetTotals";
import { SvgEllipsisV } from "@client/svgs/common/SvgEllipsisV";
// import { useTranslation } from "@client/hooks/localization/useTranslation";

export const BlackjackHeader = () => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const dispatch = useAppDispatch();

  const toggleTheme = useCallback(() => {
    dispatch(Blackjack.toggleDarkTheme());
  }, [dispatch]);

  return (
    <Div width={"full"}>
      <Conditional
        value={mainLayout}
        mobile={<MobileHeader toggleTheme={toggleTheme} />}
        tablet={<NotMobileHeader toggleTheme={toggleTheme} />}
        laptop={<NotMobileHeader toggleTheme={toggleTheme} />}
        desktop={<NotMobileHeader toggleTheme={toggleTheme} />}
      />
    </Div>
  );
};

const MobileHeader = ({ toggleTheme }: { toggleTheme: () => void }) => {
  // const { t } = useTranslation();
  return (
    <Div
      fx
      justify="space-between"
    >
      <Div
        ml={20}
        width={140}
      >
        <BlackjackBetTotals />
      </Div>

      <Div gap={8}>
        <VolumeDropdown
          prefix="blackjack"
          border
          borderColor={"brown-4"}
        />
        <Dropdown
          type="menu"
          button={
            <Button
              kind="tertiary-black-overlay"
              icon={SvgEllipsisV}
              border
              borderColor={"brown-4"}
            />
          }
          options={[
            {
              type: "action",
              label: "Fairness",
              iconLeft: SvgCheckCircle,
              onClick: () =>
                Dialogs.open("primary", <FairnessSeedModal historyTo="/fairness/blackjack" />),
            },
            {
              type: "action",
              label: "Rules",
              iconLeft: SvgInfoCircle,
              onClick: () => Dialogs.open("primary", <BlackjackInfoModal />),
            },
            // {
            //   type: "action",
            //   label: "Theme",
            //   onClick: toggleTheme,
            // },
          ]}
        />
      </Div>
    </Div>
  );
};

const NotMobileHeader = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const { t } = useTranslation();
  return (
    <Div
      fx
      width={"full"}
      justify="space-between"
    >
      <Div ml={20}>
        <BlackjackBetTotals />
      </Div>

      <Div
        fx
        align="flex-start"
        justify="flex-end"
        gap={8}
      >
        {["development", "staging"].includes(config.env) && (
          <Button
            kind="secondary"
            label="Debug"
            onClick={() => Dialogs.open("primary", <BlackjackDebugModal />)}
          />
        )}

        <Fragment>
          <Button
            kind="tertiary-black-overlay"
            icon={SvgCheckCircle}
            label={t("menu.fairness")}
            border
            borderColor={"brown-4"}
            onClick={() =>
              Dialogs.open("primary", <FairnessSeedModal historyTo="/fairness/blackjack" />)
            }
          />
          <Button
            kind="tertiary-black-overlay"
            icon={SvgInfoCircle}
            border
            borderColor={"brown-4"}
            onClick={() => Dialogs.open("primary", <BlackjackInfoModal />)}
          />
        </Fragment>
        <VolumeDropdown
          prefix="blackjack"
          border
          borderColor={"brown-4"}
        />
      </Div>
    </Div>
  );
};
