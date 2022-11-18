import { Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export class UserController {
  async getUser(req: Request, res: Response) {
    const jwt: any = req.headers["authorization"];
    console.log(jwt);

    const [, token] = jwt.split(" ");

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const decoded: any = verify(token, "secret");
    console.log("DECODED", decoded);

    return res.json({
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      photoUrl: decoded.photoUrl,
    });
  }

  async createUser(req: Request, res: Response) {
    console.log("OPA POST");
    console.log("req", req.body);

    const createUserBody = z.object({
      access_token: z.string(),
    });

    const { access_token } = createUserBody.parse(req.body);
    console.log("access_token", access_token);

    let userResponse;
    try {
      userResponse = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    } catch (e) {
      console.log(e);
      throw new Error("Error");
    }

    let userData;
    try {
      userData = await userResponse.json();
      console.log(userData);
    } catch (e) {
      console.log(e);
      throw new Error("");
    }

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string(),
      name: z.string(),
      picture: z.string().url(),
    });

    const userInfo = userInfoSchema.parse(userData);
    console.log("userInfo", userInfo);

    let user = await prisma.user.findUnique({
      where: {
        googleId: userInfo.id,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          googleId: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          avatarUrl: userInfo.picture,
        },
      });
    }

    const token = sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        photoUrl: user.avatarUrl,
      },
      "secret",
      {
        expiresIn: "7d",
      }
    );

    console.log("token", token);

    return res.json(token);
  }
}
