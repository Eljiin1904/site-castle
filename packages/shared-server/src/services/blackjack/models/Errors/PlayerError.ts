import { CustomError, CustomErrorArg } from "./CustomError";

export class PlayerError extends CustomError {
  constructor(
    message: string,
    userId: string | undefined,
    data: CustomErrorArg["data"] = {},
    arg: Omit<CustomErrorArg, "data"> = {},
  ) {
    data.userId = userId;
    super(message, { ...arg, data });
    this.name = "PlayerError";
  }
}
