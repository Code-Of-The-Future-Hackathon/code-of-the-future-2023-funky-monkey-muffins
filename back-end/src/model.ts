import { z } from 'zod';
import validator from 'validator';

export const LoginFormSchema = z.object({
    username: z.string().min(1).max(50),
    password: z.string().min(8).max(32),
});

export const SignUpFormSchema = LoginFormSchema.extend({
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    phoneNumber: z.string().refine(validator.isMobilePhone),
    email: z.string().refine(validator.isEmail),
});

export const UpdateUserFormSchema = SignUpFormSchema.partial();

export const CreatePsychologistFormSchema = z.object({
    qualification: z.string().min(1).max(100),
    aboutMe: z.string().min(100),
    tags: z.array(z.string()),
});

export const PsychologistQuerySchema = z.object({
    tags: z.array(z.string()),
    generalText: z.string().min(1).max(100),
});

export const CreateTherapySessionFormSchema = z.object({
    date: z.string().refine(validator.isISO8601),
    sessionTierId: z.string(),
    psychologistId: z.string(),
});

export const CreateTherapySessionCommentFormSchema = z.object({
    description: z.string().min(1).max(1000),
    rating: z.number().min(0).max(1),
    sessionId: z.string(),
});
