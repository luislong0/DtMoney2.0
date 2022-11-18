import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayloadProps = {
  id: string;
  iat: number;
  exp: number;
};

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const jwt: any = req.headers["authorization"];
  console.log(jwt);

  const [, token] = jwt.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const decoded: any = verify(token, "secret");
  console.log("DECODED", decoded);
}
