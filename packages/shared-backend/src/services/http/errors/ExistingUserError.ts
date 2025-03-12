export class ExistingUserError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, ExistingUserError.prototype);
  }
}
