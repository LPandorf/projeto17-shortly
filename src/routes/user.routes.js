import { Router } from "express";
import { userById, ranking } from "../controllers/user.controllers.js";
import {singValidation} from "../middlewares/sing.middlewares.js";

const router=Router();

router.get("/users/me", singValidation, userById);
router.get("/ranking", ranking);

export default router;