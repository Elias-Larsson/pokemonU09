import type { Request, Response } from "express";
import User from "../models/user";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "User exists already" });
      return;
    }
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: `User ${name} created succesfully` });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Something went wrong creating a user", error });
      return;
    }
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const { getUsers } = req.body;
  try {
    const limit = parseInt(req.query.limit as string) || 0;
    const users = await User.find(getUsers).limit(limit);
    res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "error, could not find users!" });
    }
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) res.status(404).json({ message: "User not found! " });
    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Could not fetch user!" });
    }
  }
};
