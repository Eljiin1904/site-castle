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

export function initHttp() {
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

  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: !(env === "development" || env === "devcloud"),
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      },
      store: MongoStore.create({
        client: Database.manager.client,
        dbName: env,
        // 127.0.0.1 will be the dev domain for both site and admin api
        // to avoid conflict, just use the same cookie in the dev env
        collectionName:
          env === "development" || env === "devcloud" ? "user-sessions" : "admin-sessions",
      }),
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

  app.use((req, res) => res.status(404).send());
  app.use(Http.appErrorHandler);

  const server = createServer(app);

  return server;
}
