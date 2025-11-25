import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import  AppDataSource  from "../dataSource";
import { User } from "../entities/User";

// Extend Express Request to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = header.split(" ")[1];

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (!decoded.userId) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({
      where: { id: decoded.userId }
    });

    if (!user) {
      return res.status(403).json({ error: "User not found or deleted" });
    }

    // Attach ID for controllers/services
    req.userId = user.id;

    next();
  } catch (err: any) {
    console.error("Auth error:", err);

    return res.status(401).json({
      error: "Token expired or invalid"
    });
  }
};

export default auth;
