import express, { Express } from "express";
import * as dotenv from "dotenv";
import { router } from "./router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 8000;

app.set("views", "./src/views");
app.set("view engine", "pug");

app.use(router);
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
