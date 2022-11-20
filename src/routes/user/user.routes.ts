import { Router } from "express";
import { createUserController } from "../../controller";
import authToken from "../../middlewares/authtoken.middleware";
import validateShape from "../../middlewares/validateShape.middlewares";

import { createUserShape, loginUserShape } from "../../shapes";
import loginUserController from "../../controller/user/loginUser.controller";

const userRoutes = Router();

userRoutes.post(
  "/user/signup",
  validateShape(createUserShape),
  createUserController
);
userRoutes.post(
  "/user/signin",
  validateShape(loginUserShape),
  authToken,
  loginUserController
);

export default userRoutes;
