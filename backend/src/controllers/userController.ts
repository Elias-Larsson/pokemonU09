import type { Request, Response } from "express";
import GoogleUser from "../models/oauthSchema";
import type { googleUserType } from "../models/oauthSchema";

export const setUsername = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.isAuthenticated() || !req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { username } = req.body;

  if (!username || username.trim() === "") {
    res.status(400).json({ message: "Username is required" });
    return;
  }

  try {
    const existing = await GoogleUser.findOne({ username });
    if (existing) {
      res.status(409).json({ message: "Username already taken" });
      return;
    }

    const userId = (req.user as googleUserType)._id;

    const user = await GoogleUser.findByIdAndUpdate(
      userId,
      { username },
      { new: true }
    );

    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Something went wrong updating username",
        error,
      });
    }
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.isAuthenticated() || !req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const userId = (req.user as googleUserType)._id;

    await GoogleUser.findByIdAndDelete(userId);

    req.logout((err) => {
      if (err) {
        res.status(500).json({ message: "Logout failed", error: err });
        return;
      }
      res.status(200).json({ message: "User deleted and logged out" });
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "Could not delete user", error });
    }
  }
};

export const incrementVictory = async (req: Request, res: Response): Promise<void> => {
  
  try { 
     if (!req.isAuthenticated() || !req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const userId = (req.user as googleUserType)._id;

    const user = await GoogleUser.findByIdAndUpdate(
      userId,
      { $inc: { victoryCount: 1 } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({messsage: "hey" });
  } catch (error) {
    console.error("incrementVictory error:", error); 
    res.status(500).json({ message: "Could not increment victory count"});
  }
};