import { z } from 'zod';

export const userType = z.object({
  user: z.object({
    _id: z.string(),
    email: z.string(),
    namaLengkap: z.string(),
    token: z.string(),
    role: z.string(),
  }),
});

export type userSchema = z.infer<typeof userType>;
