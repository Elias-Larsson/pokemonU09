import express from "express";
import { setUsername, deleteAccount, incrementVictory, incrementDefeat, getUserStats } from "../controllers/userController";

const authRouter = express.Router();

authRouter.put("/username", setUsername);
authRouter.delete("/account", deleteAccount);
authRouter.put("/victory", incrementVictory);
authRouter.put("/defeat", incrementDefeat);
authRouter.get("/stats", getUserStats);
export default authRouter;
