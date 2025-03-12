import { UserDocument } from "@core/types/users/UserDocument";

export function loginUser(req: Express.Request, user: UserDocument) {
  return new Promise<void>((resolve, reject) => {
    req.login(user, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
