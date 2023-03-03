import { Router } from "express";
import { singValidation } from "../middlewares/sing.middlewares.js";
import { short } from "../controllers/url.controllers.js";

const router=Router();

router.post("/urls/shorten", singValidation, short);


export default router;