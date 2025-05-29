import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useCreateGame } from "#app/services/blackjack/hooks/useCreateGame";
import { useGame, useProcessing } from "#app/services/blackjack/redux/selectors";
import { useCallback } from "react";
import { BlackjackInputGroup } from "./BlackjackInputGroup";

export const BlackjackFooter = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);

  const { t } = useTranslation();
  const sm = layout === "mobile";
  const createGame = useCreateGame();
  const processing = useProcessing();
  const game = useGame();
  const onClick = useCallback(() => {
    if (processing) return;
    createGame();
  }, []);

  const inputWidth = sm ? "full" : 160;
  return (
    <Div
      fx
      px={sm ? 20 : 24}
      gap={sm ? 8 : 12}
      bg="black-overlay"
      zIndex={15}
      wrap
      width={"full"}
    >
      <Div>{!game && <BlackjackInputGroup />}</Div>
    </Div>
  );
};
