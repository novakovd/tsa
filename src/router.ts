import { Router } from "express";
import { home } from "./routes/home";
import { save } from "./routes/save";

const router = Router();

router.get("/", home);
router.post("/s", save);

export { router };
