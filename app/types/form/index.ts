import z from 'zod';

export const FormRegisterType = z.object({
  namaLengkap: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

export const FormEditProfile = z.object({
  namaLengkap: z.string(),
  email: z.string(),
  password: z.string().optional(),
  role: z.string().optional(),
});

export const FormLoginType = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const FormBikinKucing = z.object({
  namaKucing: z.string(),
  ras: z.string(),
  umur: z.number().nullable(),
  berat: z.number().nullable(),
  tingkatAktivitas: z.string(),
  kondisiKesehatan: z.array(z.string()),
});

export const FormBikinLayanan = z.object({
  namaLayanan: z.string(),
  deskripsi: z.string(),
  benefit: z.array(z.string()),
  harga: z.number().nullable(),
  diskon: z.number().nullable(),
  durasiLayanan: z.number().nullable(),
  kategori: z.string(),
  status: z.string(),
});

export type FormRegisterSchema = z.infer<typeof FormRegisterType>;
export type FormLoginSchema = z.infer<typeof FormLoginType>;
export type FormBikinKucingSchema = z.infer<typeof FormBikinKucing>;
export type FormBikinLayananScham = z.infer<typeof FormBikinLayanan>;
export type FormEditProfileSchema = z.infer<typeof FormEditProfile>;
