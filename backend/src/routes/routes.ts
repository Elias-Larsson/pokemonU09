import express, { type Express } from "express";
import { createUser, getUsers } from "../controllers/users.ts";
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUser);

export default userRouter;