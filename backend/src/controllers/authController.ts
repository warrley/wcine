import { Request, RequestHandler, Response } from "express";
import { signinSchema, signupSchema } from "../schemas/auth";
import { createUser, verifyUser } from "../services/user";

export const signin: RequestHandler = async (req: Request, res: Response) => {
    try {
        const safeData = signinSchema.safeParse(req.body);
        if(!safeData.success){
            return res.json({ error: safeData.error.flatten().fieldErrors });
        };

        const result = await createUser(safeData.data);
        const { password, ...userWithoutPassword } = result;
        return res.status(201).json({ user: userWithoutPassword });
    } catch(error: any) {
        if(error.message === "EMAIL_EXISTS") {
            return res.status(409).json({
                error: "email already registered"
            });
        }

        return res.status(500).json({ error: "error creating user" });
    };
};

export const signup: RequestHandler = async (req: Request, res: Response) => {
    const safeData = signupSchema.safeParse(req.body);
    if(!safeData.success){
        return res.json({ error: safeData.error.flatten().fieldErrors });
    };

    const user = await verifyUser(safeData.data);
    if(!user) return res.json({ error: "acess denied" });

    const { password, ...userWithoutPassword } = user;
    
    return res.json({ user: userWithoutPassword });
};