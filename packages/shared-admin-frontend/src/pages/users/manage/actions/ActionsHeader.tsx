import { UserActionKind } from "@core/types/users/UserActionKind";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Heading } from "@client/comps/heading/Heading";
import { SvgFilter } from "@client/svgs/common/SvgFilter";
import { Strings } from "@core/services/strings";
import { Button } from "@client/comps/button/Button";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { CardSection } from "@client/comps/cards/CardSection";
import { Users } from "#app/services/users";

export const ActionsHeader = ({
  kind,
  isLoading,
  setKind,
  onRefreshClick,
}: {
  kind: UserActionKind | undefined;
  isLoading: boolean;
  setKind: (x: UserActionKind | undefined) => void;
  onRefreshClick: () => void;
}) => {
  return (
    <CardSection
      position="top"
      align="center"
      gap={12}
    >
      <Heading flexGrow>{"Action Log"}</Heading>
      <Dropdown
        type="select"
        icon={SvgFilter}
        options={["All Actions", ...Users.actionKinds].map(
          Strings.kebabToTitle,
        )}
        value={kind ? Users.actionKinds.indexOf(kind) + 1 : 0}
        onChange={(x, i) =>
          setKind(i === 0 ? undefined : Users.actionKinds[i - 1])
        }
      />
      <Button
        className="refresh-button"
        kind="secondary"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
    </CardSection>
  );
};
