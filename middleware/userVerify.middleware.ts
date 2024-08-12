import { NextFunction, Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { db } from "../utils/db";
import { User } from "@prisma/client";

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    const { email } = decodedToken;

    const user = await db.user.findFirst({
      where: { email },
    });
    req.authUser = user as User;
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      next();
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    res.status(500).send("Failed to fetch user data");
  }
};
