import { FC, memo } from "react";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { Button } from "@client/comps/button/Button";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { SvgCaretLeft } from "@client/svgs/common/SvgCaretLeft";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { Link } from "@client/comps/link/Link";
import { Span } from "@client/comps/span/Span";
import { SvgCog } from "@client/svgs/common/SvgCog";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Dialogs } from "@client/services/dialogs";
import { VolumeDropdown } from "#app/comps/sounds/VolumeDropdown";
import { FairnessSeedModal } from "#app/modals/fairness/FairnessSeedModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

type ChestHeaderProps = {
  chest: ChestDocument;
  backTo: string;
  fairnessTo: string;
  description: JSX.Element | undefined;
};

export const ChestHeader: FC<ChestHeaderProps> = memo((props) => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Div
      className="ChestHeader"
      height={40}
    >
      <Conditional
        value={mainLayout}
        mobile={<MobileHeader {...props} />}
        tablet={<NotMobileHeader {...props} />}
        laptop={<NotMobileHeader {...props} />}
        desktop={<NotMobileHeader {...props} />}
      />
    </Div>
  );
});

const MobileHeader: FC<ChestHeaderProps> = ({
  chest,
  backTo,
  fairnessTo,
  description,
}) => {
  return (
    <Div fx>
      <Link
        type="router"
        to={backTo}
        flexCenter
        hover="none"
      >
        <Button
          kind="secondary"
          icon={SvgCaretLeft}
        />
      </Link>
      <Div
        fx
        justify="flex-start"
        align="center"
        ml={12}
      >
        <Img
          type="png"
          path={`/chests/${chest.imageId}`}
          width="50px"
        />
        <Div
          column
          align="flex-start"
          gap={4}
          ml={8}
        >
          <Span
            size={12}
            color="light-gray"
          >
            {chest.displayName}
          </Span>
          {description || (
            <Tokens
              value={chest.openCost}
              fontSize={13}
            />
          )}
        </Div>
      </Div>
      <Div gap={8}>
        <VolumeDropdown prefix="cases" />
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
                  <FairnessSeedModal historyTo={fairnessTo} />,
                ),
            },
          ]}
        />
      </Div>
    </Div>
  );
};

const NotMobileHeader: FC<ChestHeaderProps> = ({
  chest,
  backTo,
  fairnessTo,
  description,
}) => {
  return (
    <Div fx>
      <Div
        fx
        align="flex-start"
      >
        <Link
          type="router"
          to={backTo}
          hover="none"
        >
          <Button
            kind="secondary"
            icon={SvgCaretLeft}
            label="Back"
          />
        </Link>
      </Div>
      <Div
        fx
        center
        gap={12}
      >
        <Img
          type="png"
          path={`/chests/${chest.imageId}`}
          width="50px"
        />
        <Div
          column
          align="flex-start"
          gap={4}
        >
          <Span
            family="title"
            weight="semi-bold"
            size={14}
            color="white"
          >
            {chest.displayName}
          </Span>
          {description || <Tokens value={chest.openCost} />}
        </Div>
      </Div>
      <Div
        fx
        align="flex-start"
        justify="flex-end"
        gap={8}
      >
        <VolumeDropdown prefix="cases" />
        <Button
          kind="secondary"
          icon={SvgCheckCircle}
          label="Fairness"
          onClick={() =>
            Dialogs.open(
              "primary",
              <FairnessSeedModal historyTo={fairnessTo} />,
            )
          }
        />
      </Div>
    </Div>
  );
};
