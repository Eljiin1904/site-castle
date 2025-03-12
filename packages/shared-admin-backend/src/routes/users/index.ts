import { Router } from "express";
import creditTokens from "./creditTokens";
import debitTokens from "./debitTokens";
import disableAuthenticator from "./disableAuthenticator";
import editBan from "./editBan";
import editEmail from "./editEmail";
import editMute from "./editMute";
import editName from "./editName";
import editReferral from "./editReferral";
import editRole from "./editRole";
import editTags from "./editTags";
import editSuspension from "./editSuspension";
import getActions from "./getActions";
import getTransactions from "./getTransactions";
import getUser from "./getUser";
import getUsers from "./getUsers";
import setTipLimit from "./setTipLimit";

const router = Router();

creditTokens(router);
debitTokens(router);
disableAuthenticator(router);
editBan(router);
editEmail(router);
editMute(router);
editName(router);
editReferral(router);
editRole(router);
editTags(router);
editSuspension(router);
getActions(router);
getTransactions(router);
getUser(router);
getUsers(router);
setTipLimit(router);

export default router;
