import { memo, useEffect } from "react";
import { useUnmount } from "usehooks-ts";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { usePresence } from "#app/hooks/sockets/usePresence";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";
import { Blackjack } from "#app/services/blackjack";
import { BlackjackSoundManager } from "./BlackjackSoundManager";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const BlackjackManager = memo(() => {
  const dispatch = useAppDispatch();
  const world = Blackjack.useWorld();
  const authenticated = useAppSelector((x) => x.user.authenticated);

  usePresence({
    joinKey: "blackjack-join",
    leaveKey: "blackjack-leave",
  });

  useEffect(() => {
    if (!authenticated) return;

    const cardsDealtFn = () => {
      dispatch(Blackjack.setCardsDealt());
    };
    world.on("cards-dealt", cardsDealtFn);
    return () => {
      world.off("cards-dealt", cardsDealtFn);
    };
  }, [authenticated, world]); // world currently doesn't change

  useSocketListener("blackjack-init", (init) => {
    dispatch(Blackjack.init(init));
  });

  useSocketListener("blackjack-insert", (doc) => {
    dispatch(Blackjack.updateFeed(doc));
  });

  useEffect(() => {
    if (!authenticated) Blackjack.clearGame({ resetBetting: true });
  }, [authenticated]);

  useUnmount(() => {
    // currently not in use
    dispatch(Blackjack.clearGame({ resetBetting: true }));
  });

  return <BlackjackSoundManager />;
});
