import { z } from 'zod';

export const schemaLogin = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type TLogin = z.infer<typeof schemaLogin>;

export type TLoginResponse = {
  id: string;
  bio: string;
  cityId: number;
  countryId: number;
  mentorId: string | null;
  name: string;
  noTelephone: string;
  photo: string;
  photoOriginal: string;
  photoUrl: string;
  provinceId: number | null;
  role: string;
  username: string;
  accessToken: string;
  refreshToken: string;
};

export type TSession = {
  user: {
    id: string;
    bio: string;
    cityId: number;
    countryId: number;
    mentorId: string | null;
    name: string;
    noTelephone: string;
    photo: string;
    photoOriginal: string;
    photoUrl: string;
    provinceId: number | null;
    role: string;
    username: string;
  };
  token: string;
  refreshToken: string;
  expires: Date;
};

export type TUser = {
  id: string;
  bio: string;
  cityId: number;
  countryId: number;
  mentorId: string | null;
  name: string;
  noTelephone: string;
  photo: string;
  photoOriginal: string;
  photoUrl: string;
  provinceId: number | null;
  role: string;
  username: string;
};
