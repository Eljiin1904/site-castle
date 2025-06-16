import { BasicUser } from "@core/types/users/BasicUser";
import { Toasts } from "@client/services/toasts";
import { Div } from "@client/comps/div/Div";
import { ConfirmModal } from "@client/modals/confirm/ConfirmModal";
import { Span } from "@client/comps/span/Span";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Vector } from "@client/comps/vector/Vector";

export const UserBlockModal = ({ user }: { user: BasicUser }) => {
  const level = Users.getLevel(user.xp);
  const {t} = useTranslation();
  const levelIcon = Users.getLevelIcon(level);
  const levelColor = Users.getLevelColor(level);
  return (
    <ConfirmModal
      heading={t("chat.blockModal.title")}
      disableMobileFullscreen={false}
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
          column
        >
          <Span>{t('chat.blockModal.description',{value: {username: user.name}})}</Span>
          
          <Div
            gap={4}
          >
            <Span
              weight="bold"
              size={20}
              color={levelColor}
            >
              {user.name}
            </Span>
            <Div
              align="center"
              mt={2}
            >
              <Vector as={levelIcon} size={16} color={levelColor} />
              <Span
                size={12}
                ml={6}
                color={levelColor}
              >
                {t('chat.level',{level:level})}
              </Span>
            </Div>
          </Div>
        </Div>
      }
    />
  );
};
