import { Router } from "express";
import { home } from "./routes/home";
import { save } from "./routes/save";
import { revealConfirm } from "./routes/reveal-confirm";
import { reveal } from "./routes/reveal";
import { handleValidationError } from "./middlewares/handle-validation-error";
import { handleHTTPError } from "./middlewares/handle-http-error";
import { handleGenericError } from "./middlewares/handle-generic-error";
import { LogError } from "./middlewares/log-error";

const router = Router();

router.get("/", home);
router.get("/r/:secureId", revealConfirm);
router.post("/save", save);
router.post("/reveal", reveal);

router.use(LogError);
router.use(handleValidationError);
router.use(handleHTTPError);
router.use(handleGenericError);

export { router };
