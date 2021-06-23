import { Router } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { CreateTagController } from "./controllers/tags/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAdmin, createTagController.handle);

export { router };
