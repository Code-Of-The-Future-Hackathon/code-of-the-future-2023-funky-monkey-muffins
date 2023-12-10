import { z } from 'zod';

const UserZodSchema = z.object({
    createdAt: z.coerce.date(),
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    username: z.string(),
});

type UserSchema = z.infer<typeof UserZodSchema>;

class UserService {
    async getSelf(): Promise<FetchResult<UserSchema>> {
        const response = await fetch('/api/user/@me');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        const user = UserZodSchema.parse(body);
        return { success: true, data: user };
    }

    async getUserById(id: string): Promise<FetchResult<UserSchema>> {
        const response = await fetch(`/api/user/${id}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        const user = UserZodSchema.parse(body);
        return { success: true, data: user };
    }

    async updateSelf(user: UserSchema): Promise<FetchResult<UserSchema>> {
        const response = await fetch('/api/user/@me', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        const updatedUser = UserZodSchema.parse(body);
        return { success: true, data: updatedUser };
    }
}