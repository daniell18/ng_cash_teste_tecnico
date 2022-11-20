import { decodeBase64 } from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import jwtConfig from "../configs";
import User from "../entities/User";
import { ErrorHandler } from "../utils";

interface IDecoded {
  iat: number;
  exp: number;
  user: User;
}

const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ErrorHandler(401, { erro: "missing authorization token" });
    }

    verify(token, jwtConfig.SECRET_KEY, (err, decoded) => {
      if (err) {
        throw new ErrorHandler(401, err);
      }

      if (req.params.username != (decoded as IDecoded).user.username) {
        throw new ErrorHandler(401, "Permision Denied");
      }
      return next();
    });
  } catch (e) {
    return res.status(e.status).json({ error: e.message });
  }
};

export default verifyAuth;
