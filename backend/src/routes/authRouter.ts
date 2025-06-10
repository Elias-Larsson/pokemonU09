import express from "express";
import { setUsername, deleteAccount, incrementVictory, incrementDefeat } from "../controllers/userController";

const authRouter = express.Router();

authRouter.patch("/username", setUsername);
authRouter.delete("/account", deleteAccount);
authRouter.put("/victory", incrementVictory);
authRouter.put("/defeat", incrementDefeat);

export default authRouter;
