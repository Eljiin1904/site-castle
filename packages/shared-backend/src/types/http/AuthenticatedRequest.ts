import type { UserDocument } from "@core/types/users/UserDocument";
import type { Request } from "express";

export type AuthenticatedRequest = Request<any, any, any, any> & {
  user: UserDocument;
};
