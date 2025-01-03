import { z } from 'zod';

export const createUserSchema = z.object({ name: z.string().min(3).max(255) });

export type CreateUserPayload = z.infer<typeof createUserSchema>;
