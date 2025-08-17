import z, { any, string, TypeOf } from 'zod';

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
  _id: any(),
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
  status: z.string().optional(),
});

export const FormBikinKnowledge = z.object({
  ras: z.array(z.string()),
  min_umur: z.number().nullable(),
  max_umur: z.number().nullable(),
  min_berat: z.number().nullable(),
  max_berat: z.number().nullable(),
  tingkatAktivitas: z.array(z.string()),
  kondisi: z.array(z.string()),
});

export const FormAddToChart = z.object({
  layananId: z.string(),
  kucingId: z.string(),
  jadwal: z.any(),
});

export const FormCheckOut = z.object({
  metodePembayaran: z.string(),
});

export const FormStatusPemesanan = z.object({
  statusPesanan: z.string(),
});

export const FormPembayaran = z.object({
  pesananId: z.string(),
  metodePembayaran: z.string(),
  amount: z.number().nullable(),
});

export const FormStatusPembayaran = z.object({
  statusPembayaran: z.string(),
});

export type FormRegisterSchema = z.infer<typeof FormRegisterType>;
export type FormLoginSchema = z.infer<typeof FormLoginType>;
export type FormBikinKucingSchema = z.infer<typeof FormBikinKucing>;
export type FormBikinLayananScham = z.infer<typeof FormBikinLayanan>;
export type FormEditProfileSchema = z.infer<typeof FormEditProfile>;
export type FormBikinKnowledgeSchema = z.infer<typeof FormBikinKnowledge>;
export type FormAddToChartSchema = z.infer<typeof FormAddToChart>;
export type FormCheckOutSchema = z.infer<typeof FormCheckOut>;
export type FormStatusPemesananaSchema = z.infer<typeof FormStatusPemesanan>;
export type FormPembayaranShema = z.infer<typeof FormPembayaran>;
export type FormStatusPembayaranSchema = z.infer<typeof FormStatusPembayaran>;
