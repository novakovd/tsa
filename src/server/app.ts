import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";
import "dotenv-defaults/config";
import { router } from "./router";
import bodyParser from "body-parser";
import * as process from "process";
import { getWebpackBuildHash } from "./providers/system";
import { setupDi } from "./setup-di";
import { getConfig, getLogger } from "./providers/container-service";
import { any } from "./routes/any";

dotenv.config();

const app = express();

setupDi();

process.env.WEBPACK_BUILD_HASH = getWebpackBuildHash();
process.env.DATABASE_URL = getConfig().databaseUrl;

app.set("views", getConfig().viewsPath);
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(router);
app.use(express.static("public"));
app.use(any);

app.listen(getConfig().appPort, () => {
  getLogger().info(`Server is running at ${getConfig().appUrl}`);
});
