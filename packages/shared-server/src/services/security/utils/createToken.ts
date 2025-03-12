import { TokenDocument } from "@core/types/security/TokenDocument";
import { TokenKindData } from "@core/types/security/TokenKind";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";

type CreateOptions = TokenKindData & {
  token: string;
  expires: Date;
};

export async function createToken(options: CreateOptions) {
  const document: TokenDocument = {
    _id: Ids.object(),
    timestamp: new Date(),
    ...options,
  };

  await Database.collection("tokens").insertOne(document);

  return document.token;
}
