import { z } from 'zod';

export const SignUpFormSchema = z.object({
    username: z.string().min(1).max(50),
    password: z.string().min(8).max(32),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    email: z.string().min(3).max(50).email("Invalid email"),
});

export const LoginFormSchema = z.object({
    username: z.string().min(1).max(50),
    password: z.string().min(8).max(32),
});
