import { TokenDocument } from "@core/types/security/TokenDocument";
import { TokenKind } from "@core/types/security/TokenKind";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";

export async function consumeToken<K extends TokenKind>({
  kind,
  token,
}: {
  kind: K;
  token: string;
}) {
  const document = await Database.collection("tokens").findOneAndDelete({
    kind,
    token,
  });

  if (!document) {
    
    const e = new HandledError(`errors.token.invalid`);
    e.cause = kind;
    throw e;
  }

  return document as TokenDocument & { kind: K };
}
