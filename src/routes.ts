import { Router } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { CreateTagController } from "./controllers/tags/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/users/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/compliments/CreateComplimentController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

router.post("/users", createUserController.handle);
router.post("/tags", ensureAdmin, createTagController.handle);
router.post("/sessions", authenticateUserController.handle);
router.post("/compliments", createComplimentController.handle);

export { router };
