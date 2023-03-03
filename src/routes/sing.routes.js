import { Router } from "express";
import { singIn } from "../controllers/sing.controllers.js";
import { singUp } from "../controllers/user.controllers.js";
import { validation } from "../middlewares/validate.middlewares.js";
import {singSchema} from "../schemas/sing.schema.js";
import {userSchema} from "../schemas/user.schema.js";

const router = Router();

router.post("/signup", validation(userSchema), singUp);
router.post("/signin", validation(singSchema), singIn);

export default router;