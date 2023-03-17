import { Router } from "express";
import { home } from "./routes/home";

const router = Router();

router.get("/", home);

export { router };
