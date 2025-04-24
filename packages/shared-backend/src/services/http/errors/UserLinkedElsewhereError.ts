export class UserLinkedElsewhereError extends Error {
  userId: string;
  providerId: string;

  constructor(userId: string, providerId: string, message?: string) {
    super(message);

    this.userId = userId;
    this.providerId = providerId;

    Object.setPrototypeOf(this, UserLinkedElsewhereError.prototype);
  }
}
