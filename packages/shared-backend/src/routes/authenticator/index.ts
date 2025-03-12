import { Router } from "express";
import disable from "./disable";
import enable from "./enable";
import getBetToken from "./getBetToken";
import getSecret from "./getSecret";
import login from "./login";
import recover from "./recover";
import toggleSetting from "./toggleSetting";
import updateSettings from "./updateSettings";

const router = Router();

disable(router);
enable(router);
getBetToken(router);
getSecret(router);
login(router);
recover(router);
toggleSetting(router);
updateSettings(router);

export default router;
