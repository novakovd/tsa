import "reflect-metadata";
import express from "express";
import * as dotenv from "dotenv";
import "dotenv-defaults/config";
import { router } from "./router";
import bodyParser from "body-parser";
import * as process from "process";
import { getWebpackBuildHash } from "./utils/general";
import { setupDi } from "./setup-di";
import { getConfig, getLogger } from "./utils/container";
import { any } from "./routes/any";

dotenv.config();

const app = express();

process.env.WEBPACK_BUILD_HASH = getWebpackBuildHash();

setupDi();

app.set("views", getConfig().viewsPath);
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(router);
app.use(express.static("public"));
app.use(any);

app.listen(getConfig().appPort, () => {
  getLogger().info(`Server is running at ${getConfig().appUrl}`);
});
