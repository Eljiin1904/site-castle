import { TokenDocument } from "@core/types/security/TokenDocument";
import { TokenKind } from "@core/types/security/TokenKind";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

export async function getToken<K extends TokenKind>({ kind, token }: { kind: K; token: string }) {
  const logger = getServerLogger({});
  logger.info("fetching token: " + token);
  const document = await Database.collection("tokens").findOne({
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
