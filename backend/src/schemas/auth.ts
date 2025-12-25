import z from "zod";

export const signinSchema = z.object({
    username: z.string("required"),
    age: z.number("must be a number").min(18, "must be greater than or equal 18"),
    email: z.email("invalid email format"),
    password: z.string("required")
});

export const signupSchema = z.object({
    email: z.string("invalid email format"),
    password: z.string("required")
});