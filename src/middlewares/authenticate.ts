import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CreateAccountDTO } from "../dto/dto-user";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error:  `token ${authorizationHeader}` });
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET) as CreateAccountDTO;
    res.locals.user = user;
    console.log("Authenticated user:", user);
    next();
  } catch (error) {
    return res.status(401).json({ error: `token ${authorizationHeader}` });
  }
}
