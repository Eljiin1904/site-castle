import { Router } from "express";
import discord from "./discord";
import google from "./google";
import local from "./local";
import steam from "./steam";
import twitch from "./twitch";

const router = Router();

discord(router);
google(router);
local(router);
steam(router);
twitch(router);

export default router;
