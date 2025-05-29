import { CustomError, CustomErrorArg } from "./CustomError";

export class GameError extends CustomError {
  constructor(
    message: string,
    gameId: string | undefined,
    data: CustomErrorArg["data"] = {},
    arg: Omit<CustomErrorArg, "data"> = {},
  ) {
    data.gameId = gameId;
    super(message, { ...arg, data });
    this.name = "BlackjackError";
  }
}
