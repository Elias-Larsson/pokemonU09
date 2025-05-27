import type { Request, Response } from "express";
import User from "../models/user";

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email: email});
        if(existingUser) {
            res.status(400).json({message: "User exists already"});
            return;
        }
        const newUser = new User({name, email, password});
        await newUser.save();

        res.status(201).json({message: `User ${name} created succesfully`});

    } catch(error: unknown) {
        if(error instanceof Error){
            res.status(500).json({message: "Something went wrong creating a user", error});
            return;
        }
    }
}