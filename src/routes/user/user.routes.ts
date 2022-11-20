import { Router } from "express";
import { createUserController, loginUserController } from "../../controller";
import authToken from "../../middlewares/authtoken.middleware";
import validateShape from "../../middlewares/validateShape.middlewares";

import { createUserShape, loginUserShape } from "../../shapes";

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
