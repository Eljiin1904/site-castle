import { TokenDocument } from "@core/types/security/TokenDocument";
import { TokenKind } from "@core/types/security/TokenKind";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";

export async function getToken<K extends TokenKind>({
  kind,
  token,
}: {
  kind: K;
  token: string;
}) {
  const document = await Database.collection("tokens").findOne({
    kind,
    token,
  });

  if (!document) {
    throw new HandledError(`Invalid ${kind} token.`);
  }

  return document as TokenDocument & { kind: K };
}
