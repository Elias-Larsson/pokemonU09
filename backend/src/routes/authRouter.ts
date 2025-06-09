import express from "express";
import { setUsername, deleteAccount, incrementVictory } from "../controllers/userController";

const authRouter = express.Router();

authRouter.patch("/username", setUsername);
authRouter.delete("/account", deleteAccount);
authRouter.put("/victory", incrementVictory);

export default authRouter;
