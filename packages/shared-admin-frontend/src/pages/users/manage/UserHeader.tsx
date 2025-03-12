import { UserDocument } from "@core/types/users/UserDocument";
import { Div } from "@client/comps/div/Div";
import { Heading } from "@client/comps/heading/Heading";
import { SvgUser } from "@client/svgs/common/SvgUser";
import { Vector } from "@client/comps/vector/Vector";
import { Button } from "@client/comps/button/Button";
import { SvgCaretLeft } from "@client/svgs/common/SvgCaretLeft";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { Link } from "@client/comps/link/Link";
import { Users } from "#app/services/users";

export const UserHeader = ({
  user,
  isLoading,
  onRefreshClick,
}: {
  user: UserDocument;
  isLoading: boolean;
  onRefreshClick: () => void;
}) => {
  const role = Users.getRoleInfo(user.role);

  return (
    <Div
      fx
      align="center"
      gap={16}
    >
      <Div gap={8}>
        <Link
          type="router"
          to="/users"
          hover="none"
        >
          <Button
            kind="secondary"
            icon={SvgCaretLeft}
          />
        </Link>
        <Button
          kind="secondary"
          icon={SvgRedo}
          disabled={isLoading}
          onClick={onRefreshClick}
        />
      </Div>
      <Div gap={8}>
        <Vector
          as={role?.icon || SvgUser}
          size={22}
          color={role?.color || "gray"}
        />
        <Heading
          as="h2"
          size={20}
        >
          {user.username}
        </Heading>
      </Div>
    </Div>
  );
};
