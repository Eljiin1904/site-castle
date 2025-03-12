import { MongoMemoryServer } from "mongodb-memory-server";
import { Database } from "@server/services/database";

let mongoServer: MongoMemoryServer;

export const setupMongoServer = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await Database.manager.init();
};

export const stopMongoServer = async () => {
  await mongoServer.stop();
};
