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
  const game = useGame();

  return (
    <Div
      fx
      zIndex={1}
      wrap
      width={"full"}
    >
      <Div
        alignItems="center"
        justifyContent="center"
      >
        {!game && <BlackjackInputGroup />}
      </Div>
    </Div>
  );
};
