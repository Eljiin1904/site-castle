import { useIntercom } from "react-use-intercom";
import { usePost } from "@client/hooks/system/usePost";
import { store } from "#app/store";
import { Users } from "#app/services/users";
import { Support } from "#app/services/support";
import { useAppDispatch } from "../store/useAppDispatch";
import { useAppSelector } from "../store/useAppSelector";

export function useIntercomManager() {
  const booted = useAppSelector((x) => x.support.booted);
  const intercom = useIntercom();
  const dispatch = useAppDispatch();

  const handleBoot = usePost(
    async () => {
      if (booted) {
        intercom.shutdown();
      }

      const { user } = store.getState();

      if (user.authenticated) {
        const { hash } = await Support.getHash();

        intercom.boot({
          hideDefaultLauncher: true,
          userId: user._id,
          userHash: hash,
          email: user.email,
          createdAt: Math.round(user.registerDate.getTime() / 1000),
          name: user.username,
          avatar: {
            type: "avatar",
            imageUrl: Users.getAvatarUrl(user),
          },
          customAttributes: {
            level: Users.getLevel(user.xp),
          },
        });
      } else {
        intercom.boot({
          hideDefaultLauncher: true,
        });
      }

      dispatch(Support.setBooted(true));

      intercom.show();
    },
    (x) => dispatch(Support.setProcessing(x)),
  );

  const handleShutdown = () => {
    if (!booted) {
      return;
    }

    if (intercom.isOpen) {
      intercom.hide();
    }

    intercom.shutdown();

    dispatch(Support.setBooted(false));
  };

  const handleOpen = () => {
    if (booted) {
      intercom.show();
    } else {
      handleBoot().then(() => intercom.show());
    }
  };

  const handleClose = () => {
    if (booted) {
      intercom.hide();
    } else {
      handleBoot().then(() => intercom.hide());
    }
  };

  const handleToggle = () => {
    if (intercom.isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  return { handleBoot, handleShutdown, handleOpen, handleClose, handleToggle };
}
