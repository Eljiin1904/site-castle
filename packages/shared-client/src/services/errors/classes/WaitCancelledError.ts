export class WaitCancelledError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, WaitCancelledError.prototype);
  }
}
