import { CustomError, CustomErrorArg } from "./CustomError";

export class DrawCardError extends CustomError {
  constructor(arg?: CustomErrorArg) {
    super("Error drawing card", arg);
    this.name = "DrawCardError";
  }
}
