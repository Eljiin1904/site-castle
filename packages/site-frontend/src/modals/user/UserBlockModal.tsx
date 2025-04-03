import { BasicUser } from "@core/types/users/BasicUser";
import { Toasts } from "@client/services/toasts";
import { Div } from "@client/comps/div/Div";
import { ConfirmModal } from "@client/modals/confirm/ConfirmModal";
import { Span } from "@client/comps/span/Span";
import { Img } from "@client/comps/img/Img";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserBlockModal = ({ user }: { user: BasicUser }) => {
  const level = Users.getLevel(user.xp);
  const {t} = useTranslation();
  return (
    <ConfirmModal
      heading={t("chat.blockModal.title")}
      confirmLabel="chat.block"
      onConfirm={async () => {
        await Users.setUserBlocked({
          userId: user.id,
          block: true,
        });
        Toasts.success("chat.blockModal.confirmSuccess", 5000, {value: {username: user.name}});
      }}
      message={
        <Div
          fx
          align="center"
          pb={24}
          gap={16}
          borderBottom
          column
        >
          <Span>{t('chat.blockModal.description',{value: {username: user.name}})}</Span>
          
          <Div
            column
            gap={4}
          >
            <Span
              family="title"
              weight="bold"
              size={20}
              color="white"
            >
              {user.name}
            </Span>
            <Div
              align="center"
              mt={2}
            >
              <Img
                type="png"
                path={Users.getLevelBadge(level)}
                width="20px"
              />
              <Span
                size={12}
                ml={6}
              >
                {`Level ${level}`}
              </Span>
            </Div>
          </Div>
        </Div>
      }
    />
  );
};
