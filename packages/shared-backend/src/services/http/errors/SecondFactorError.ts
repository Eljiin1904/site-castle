export class SecondFactorError extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, SecondFactorError.prototype);
  }
}
