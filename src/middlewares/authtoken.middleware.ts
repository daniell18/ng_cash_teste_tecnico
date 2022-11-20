import { compareSync } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import jwtConfig from "../configs";
import User from "../entities/User";
import { UserRepository } from "../repositories";
import { ErrorHandler } from "../utils";

const authToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await new UserRepository().findByUsername(
      (req.validated as User).username
    );

    if (!user) {
      throw new ErrorHandler(400, "invalid credentials");
    }

    if (!compareSync((req.validated as User).password, user.password)) {
      throw new ErrorHandler(400, "invalid credentials");
    }

    const token: string = jwt.sign({ user }, jwtConfig.SECRET_KEY, {
      expiresIn: jwtConfig.EXPIRES_IN,
    });

    req.token = token;

    return next();
  } catch (error) {
    return res.status(error.status).json({ error: error.message });
  }
};

export default authToken;
