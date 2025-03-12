import type { UserDocument } from "@core/types/users/UserDocument";

declare global {
  namespace Express {
    interface Request {
      trueIP: string | undefined;
    }

    interface User extends UserDocument {}
  }
}

export {};
