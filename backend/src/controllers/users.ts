import type { Request, Response } from "express";
import User from "../models/user";


const getUsers = async (req: Request, res: Response): Promise<void> => {
    const { getUsers } = req.body;
    try {
      const limit = parseInt(req.query.limit as string) || 0; 
      const users = await User.find(getUsers).limit(limit);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "error, could not find users!" });
    }
  };