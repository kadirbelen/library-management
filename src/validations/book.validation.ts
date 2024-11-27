import { z } from 'zod';

export const createBookSchema = z.object({ name: z.string().min(3).max(255) });

export type CreateBookPayload = z.infer<typeof createBookSchema>;
