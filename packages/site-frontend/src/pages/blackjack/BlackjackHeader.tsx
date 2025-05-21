import { VolumeDropdown } from "#app/comps/sounds/VolumeDropdown";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";
import { Blackjack } from "#app/services/blackjack";
import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Dialogs } from "@client/services/dialogs";
import { SvgBlackjack } from "@client/svgs/common/SvgBlackjack";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { SvgCog } from "@client/svgs/common/SvgCog";
import { SvgInfoCircle } from "#client/svgs/common/SvgInfoCircle";
import { useCallback } from "react";
import { BlackjackInfoModal } from "./modals/BlackjackInfoModal";
import { BlackjackDebugModal } from "./modals/BlackjackDebugModal";
import config from "#app/config";
// import { useTranslation } from "@client/hooks/localization/useTranslation";

export const BlackjackHeader = () => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const dispatch = useAppDispatch();

  const toggleTheme = useCallback(() => {
    dispatch(Blackjack.toggleDarkTheme());
  }, [dispatch]);

  return (
    <Div>
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
    <Div fx>
      <PageTitle
        heading={"Blackjack"}
        icon={SvgBlackjack}
      />
      <Div gap={8}>
        <VolumeDropdown prefix="blackjack" />
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
                Dialogs.open("primary", <FairnessSeedModal historyTo="/fairness/blackjack" />),
            },
            {
              type: "action",
              label: "Rules",
              iconLeft: SvgInfoCircle,
              onClick: () => Dialogs.open("primary", <BlackjackInfoModal />),
            },
            {
              type: "action",
              label: "Theme",
              // iconLeft: SvgInfoCircle,
              onClick: toggleTheme,
            },
          ]}
        />
      </Div>
    </Div>
  );
};

const NotMobileHeader = ({ toggleTheme }: { toggleTheme: () => void }) => {
  // const { t } = useTranslation();
  return (
    <Div fx>
      <PageTitle
        // heading={t.games("blackjack")}
        heading={"Blackjack"}
        icon={SvgBlackjack}
      />
      <Div
        fx
        align="flex-start"
        justify="flex-end"
        gap={8}
      >
        {["development", "staging"].includes(config.env) && (
          <Button
            kind="secondary"
            // icon={SvgInfoCircle}
            label="Debug"
            onClick={() => Dialogs.open("primary", <BlackjackDebugModal />)}
          />
        )}
        <Button
          kind="secondary"
          // icon={SvgInfoCircle}
          // label={t.gameplay("theme")}
          label={"Theme"}
          onClick={toggleTheme}
        />
        <Button
          kind="secondary"
          icon={SvgCheckCircle}
          // label={t.gameplay("fairness")}
          label={"Fairness"}
          onClick={() =>
            Dialogs.open("primary", <FairnessSeedModal historyTo="/fairness/blackjack" />)
          }
        />
        <Button
          kind="secondary"
          icon={SvgInfoCircle}
          onClick={() => Dialogs.open("primary", <BlackjackInfoModal />)}
        />
        <VolumeDropdown prefix="blackjack" />
      </Div>
    </Div>
  );
};
