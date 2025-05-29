import { actions } from "@core/services/blackjack/Blackjack";
import { BlackjackAction } from "@core/types/blackjack/BlackjackAction";

export function validateActionParams({
  gameId,
  action,
  buyInsurance,
}: {
  gameId: string;
  action: BlackjackAction;
  buyInsurance: boolean | undefined;
}) {
  if (!gameId) throw new Error("Invalid gameId");
  if (!action) throw new Error("Invalid action");

  if (action == "insurance" && typeof buyInsurance !== "boolean")
    throw new Error("Invalid buyInsurance");

  if (action != "insurance" && buyInsurance !== undefined) throw new Error("Invalid buyInsurance");

  if (actions.indexOf(action) === -1) throw new Error("Invalid action: " + action);
}
