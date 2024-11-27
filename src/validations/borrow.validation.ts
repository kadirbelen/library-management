import { z } from 'zod';

export const returnBookSchema = z.object({ score: z.number().int().positive().min(1).max(10) });

export type ReturnBookPayload = z.infer<typeof returnBookSchema>;
