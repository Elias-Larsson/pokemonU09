import express from "express";
import { setUsername, deleteAccount } from "../controllers/userController";

const authRouter = express.Router();

authRouter.patch("/username", setUsername);
authRouter.delete("/account", deleteAccount);

export default authRouter;
