import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createServer } from "http";
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
import { Database } from "@server/services/database";
import { Http } from "#app/services/http";
import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";
import config from "#app/config";
import * as Routes from "#app/routes";
import { RedisStore } from "connect-redis";
import { RedisService } from "@server/services/redis/RedisService";
import { getServerLogger } from "@core/services/logging/utils/serverLogger";

const logger = getServerLogger({});
export async function initHttp() {
  const { env, domain, sessionSecret } = config;

  const app = express();

  app.set("trust proxy", 3);

  app.use(
    cors({
      origin: {
        development: ["http://127.0.0.1:3001", "http://localhost:3001"],
        devcloud: [
          "http://shared-admin-frontend",
          "http://127.0.0.1:3001",
          "http://localhost:3001",
        ],
        staging: [`https://admin.stage.${domain}`],
        production: [`https://admin.${domain}`],
      }[env],
      credentials: true,
    }),
  );

  if (env === "development" || env === "devcloud") {
    app.use(morgan("dev"));
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(Http.ipHandler);

  passport.serializeUser((user: Express.User, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await Database.collection("users").findOne({ _id: id });

      if (!user) {
        throw new HandledError("User ID is not valid.");
      }
      if (!Users.getPermissions(user.role).adminAccess) {
        throw new HandledError("User does not have admin access.");
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(Http.localStrategy());

  const isDev = env === "development" || env === "devcloud";
  const redisPrefix = isDev ? "user-sessions:" : "admin-sessions:";
  const collectionName = isDev ? "user-sessions" : "admin-sessions";

  let store;

  if (RedisService.connected) {
    try {
      store = new RedisStore({
        client: RedisService.client,
        prefix: redisPrefix,
      });
      logger.info("Using Redis session store");
    } catch (err) {
      logger.error("Failed to initialize Redis store, using MongoDB instead");
      store = MongoStore.create({
        client: Database.manager.client,
        dbName: env,
        collectionName,
      });
    }
  } else {
    logger.error("Redis not connected, using MongoDB session store");
    store = MongoStore.create({
      client: Database.manager.client,
      dbName: env,
      collectionName,
    });
  }

  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      store,
      cookie: {
        secure: !isDev,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      },
    }),
  );

  app.use(passport.session());

  app.get("/", (req, res) => res.send());
  app.use("/auth", Routes.auth);

  app.use("/affiliates", Routes.affiliates);
  app.use("/chests", Routes.chests);
  app.use("/cryptos", Routes.cryptos);
  app.use("/dev", Routes.dev);
  app.use("/economy", Routes.economy);
  app.use("/log", Routes.log);
  app.use("/market", Routes.market);
  app.use("/rewards", Routes.rewards);
  app.use("/site", Routes.site);
  app.use("/system", Routes.system);
  app.use("/transactions", Routes.transactions);
  app.use("/users", Routes.users);
  app.use("/verification", Routes.verification);
  app.use("/hub-eight", Routes.hubEight);

  app.use((req, res) => res.status(404).send());
  app.use(Http.appErrorHandler);

  const server = createServer(app);

  return server;
}
