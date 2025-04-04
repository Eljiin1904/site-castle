import { Router } from "express";
import discordCallback from "./discordCallback";
import discord from "./discord";
import googleCallback from "./googleCallback";
import google from "./google";
import local from "./local";
import logout from "./logout";
import nonce from "./nonce";
import siweCallback from "./siweCallback";
import steamCallback from "./steamCallback";
import steam from "./steam";
import twitchCallback from "./twitchCallback";
import twitch from "./twitch";
import linkAccount from "./linkAccount";

const router = Router();

discordCallback(router);
discord(router);
googleCallback(router);
google(router);
linkAccount(router);
local(router);
logout(router);
nonce(router);
siweCallback(router);
steamCallback(router);
steam(router);
twitchCallback(router);
twitch(router);

export default router;
