import { AuthenticatedRequest } from "#app/types/http/AuthenticatedRequest";

export async function logoutUser(req: AuthenticatedRequest) {
  await new Promise<void>((resolve, reject) => {
    req.logout((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
