import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createServer } from "http";
import passport from "passport";
import MongoStore from "connect-mongo";
import session from "express-session";
import { Database } from "@server/services/database";
import { HandledError } from "@server/services/errors";
import { Users } from "@server/services/users";
import { Http } from "#app/services/http";
import config from "#app/config";
import * as Routes from "#app/routes";

export function initHttp(app = express()) {
  const { env, domain, sessionSecret } = config;

  app.set("trust proxy", 3);

  app.use(
    cors({
      origin: {
        development: ["http://127.0.0.1:3000", "http://localhost:3000"],
        devcloud: [`https://dev.${domain}`, `https://api.dev.${domain}`, "http://127.0.0.1:3000", "http://localhost:3000"],
        staging: [`https://stage.${domain}`],
        production: [`https://${domain}`, `https://www.${domain}`],
      }[env],
      credentials: true,
    }),
  );

  if (env === "development") {
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
      const user = await Database.collection("users").findOneAndUpdate(
        { _id: id },
        { $set: { "meta.activeDate": new Date() } },
      );

      if (!user) {
        throw new HandledError("User ID is not valid.");
      }
      if (Users.isBanned(user.ban)) {
        throw new HandledError(`Banned: ${user.ban.reason}`);
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // TODO: update registrations where necessary once castle.com is setup
  passport.use(Http.googleStrategy());
  passport.use(Http.localStrategy());
  passport.use(Http.siweStrategy());
  passport.use(Http.steamStrategy());

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
        collectionName: "user-sessions",
      }),
    }),
  );

  app.use(passport.session());

  app.get("/", (req, res) => res.send());
  app.use("/auth", Routes.auth);
  app.use("/system", Routes.system);

  app.use(Http.maintenanceHandler);

  app.use("/affiliates", Routes.affiliates);
  app.use("/authenticator", Routes.authenticator);
  app.use("/cases", Routes.cases);
  app.use("/case-battles", Routes.caseBattles);
  app.use("/chat", Routes.chat);
  app.use("/cryptos", Routes.cryptos);
  app.use("/dice", Routes.dice);
  app.use("/double", Routes.double);
  app.use("/crash", Routes.crash);
  app.use("/economy", Routes.economy);
  app.use("/fairness", Routes.fairness);
  app.use("/games", Routes.games);
  app.use("/limbo", Routes.limbo);
  app.use("/market", Routes.market);
  app.use("/mines", Routes.mines);
  app.use("/blackjack", Routes.blackjack);
  app.use("/notifications", Routes.notifications);
  app.use("/register", Routes.register);
  app.use("/rewards", Routes.rewards);
  app.use("/support", Routes.support);
  app.use("/users", Routes.users);
  app.use("/verification", Routes.verification);

  app.use((req, res) => res.status(404).send());
  app.use(Http.appErrorHandler);

  const server = createServer(app);

  return server;
}
