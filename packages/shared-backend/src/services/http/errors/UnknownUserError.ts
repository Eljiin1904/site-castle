export class UnknownUserError extends Error {
  id: string;
  email: string;

  constructor(id: string, email?: string) {
    super();

    this.id = id;
    this.email = email || "";

    Object.setPrototypeOf(this, UnknownUserError.prototype);
  }
}
