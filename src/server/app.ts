import express, { Express } from "express";
import * as dotenv from "dotenv";
import { router } from "./router";
import bodyParser from "body-parser";
import * as process from "process";
import { getWebpackBuildHash } from "./utils/get-webpack-build-hash";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 8000;

process.env.WEBPACK_BUILD_HASH = getWebpackBuildHash();

app.set("views", "./src/server/views");
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(router);
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
