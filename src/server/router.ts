import { Router } from "express";
import { home } from "./routes/home";
import { save } from "./routes/save";
import { revealConfirm } from "./routes/reveal-confirm";
import { reveal } from "./routes/reveal";

const router = Router();

router.get("/", home);
router.get("/r/:secureId", revealConfirm);
router.post("/save", save);
router.post("/reveal", reveal);

export { router };
