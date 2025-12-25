import z from "zod";
import bcrypt from "bcryptjs";
import { signinSchema, signupSchema } from "../schemas/auth";
import { prisma } from "../config/prisma";

export const createUser = async (data: z.infer<typeof signinSchema>) => {
    if(await prisma.user.findFirst({ where: {  email: data.email } })) {
        throw new Error("EMAIL_EXISTS");
    };

    const hashPassword = await bcrypt.hash(data.password, 10);
    
    return await prisma.user.create({
        data: {
            username: data.username,
            email: data.email,
            age: data.age,
            password: hashPassword,
            money: 0,
        },
    });
};

export const verifyUser = async (data: z.infer<typeof signupSchema>) => {
    const user = await prisma.user.findFirst({ where: { email: data.email } });
    if(!user) return false;
    if(!bcrypt.compareSync(data.password, user.password)) return false;

    return user;
};