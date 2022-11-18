import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/user/signup");
userRoutes.post("/user/signin");

export default userRoutes;
