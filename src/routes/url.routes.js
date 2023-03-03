import { Router } from "express";
import { singValidation } from "../middlewares/sing.middlewares.js";
import { openNewUrl, short, urlById, urlDelete } from "../controllers/url.controllers.js";

const router=Router();

router.post("/urls/shorten", singValidation, short);
router.get("/urls/:id", urlById);
router.get("/urls/open/:shortUrl", openNewUrl);
router.delete("/urls/:id", singValidation, urlDelete);

export default router;