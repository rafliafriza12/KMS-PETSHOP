import z from 'zod';

export const FormRegisterType = z.object({
  namaLengkap: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

export const FormLoginType = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export type FormRegisterSchema = z.infer<typeof FormRegisterType>;
export type FormLoginSchema = z.infer<typeof FormLoginType>;
