import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createServer as createHttpServer } from "http";
import { Http } from "#app/services/http";
import config from "#app/config";
import * as Routes from "#app/routes";

export function initHttp() {
  const { env } = config;

  const app = express();

  app.set("trust proxy", 3);

  app.use(cors({ origin: true, credentials: true }));

  if (env === "development" || env === "devcloud") {
    app.use(morgan("dev"));
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(Http.ipHandler);

  app.get("/", (req, res) => res.send());

  app.use("/v1", Routes.v1);

  app.use((req, res, next) => res.status(404).send());
  app.use(Http.appErrorHandler);

  const server = createHttpServer(app);

  return server;
}
