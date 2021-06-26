import { Router } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { CreateTagController } from "./controllers/tags/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./controllers/users/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/compliments/CreateComplimentController";
import { ListUserSendComplimentsController } from "./controllers/compliments/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/compliments/ListUserReceiveComplimentsController";
import { ListUsersController } from "./controllers/users/ListUsersController";
import { ListTagsController } from "./controllers/tags/ListTagsController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();

const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();

const listUsersController = new ListUsersController();

const listTagsController = new ListTagsController();

router.post("/users", createUserController.handle);
router.get("/users", ensureAuthenticated, listUsersController.handle);

router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);
router.get("/tags", ensureAuthenticated, listTagsController.handle);
router.post("/sessions", authenticateUserController.handle);
router.post(
  "/compliments",
  ensureAuthenticated,
  createComplimentController.handle
);

router.get(
  "/users/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);
router.get(
  "/users/compliments/receive",
  ensureAuthenticated,
  listUserReceiveComplimentsController.handle
);

export { router };
