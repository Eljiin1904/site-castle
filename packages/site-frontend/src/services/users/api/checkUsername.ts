import { Http } from "@client/services/http";

export function checkUsername(data: { username: string }): Promise<{
  isAvailable: boolean;
}> {
  try {
    return Http.post("/users/check-username", data);
  }
  catch (error) {
    throw new Error(`Failed to check username: ${error}`);
  }
}
