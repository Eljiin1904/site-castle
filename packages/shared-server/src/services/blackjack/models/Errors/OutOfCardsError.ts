import { CustomError } from "./CustomError";

export class OutOfCardsError extends CustomError {
  constructor() {
    super("Out of cards");
  }
}
