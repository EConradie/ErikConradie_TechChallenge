import { Request, Response } from "express";
import * as UserService from "../services/userService";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await UserService.register(req.body);
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await UserService.login(req.body);
    return res.json(result);
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const result = await UserService.deleteAccount(userId);
    return res.json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
