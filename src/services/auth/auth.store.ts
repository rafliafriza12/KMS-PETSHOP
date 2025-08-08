'use server';

import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import { authService } from './auth.service';
import { schemaLogin, type TLogin, type TSession } from './auth.type';
import { env } from '@/configs/env.config';
import { APP_SESSION_COOKIE_KEY } from '@/configs/cookies.config';
import { redirect } from 'next/navigation';

const secretKey = env.AUTH_SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function validateSchemaLogin(_prevState: unknown, formData: FormData) {
  const result = schemaLogin.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (result.success === false) {
    throw new Error('Invalid input');
  }

  const session = await setSession({ ...result.data });

  console.log('session in validateSchemaLogin', session);
  if (session) {
    redirect('/home');
  }
}

export async function setSession({ username, password }: TLogin) {
  const resData = await authService.login({ username, password });

  console.log('resData', resData);

  const token = resData.data?.accessToken;
  const refreshToken = resData.data?.refreshToken;
  const user = {
    id: resData.data?.id,
    bio: resData.data?.bio,
    cityId: resData.data?.cityId,
    countryId: resData.data?.countryId,
    mentorId: resData.data?.mentorId,
    name: resData.data?.name,
    noTelephone: resData.data?.noTelephone,
    photo: resData.data?.photo,
    photoOriginal: resData.data?.photoOriginal,
    photoUrl: resData.data?.photoUrl,
    provinceId: resData.data?.provinceId,
    role: resData.data?.role,
    username: resData.data?.username,
  };

  const session = {
    user,
    token,
    refreshToken,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  } as TSession;

  const encryptedSession = await encrypt(session);

  const cookieStore = await cookies();

  cookieStore.set(APP_SESSION_COOKIE_KEY, encryptedSession, {
    expires: session.expires,
    httpOnly: true,
  });

  return session;
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(APP_SESSION_COOKIE_KEY)?.value;

  if (!session) return null;

  return await decrypt(session);
}

export async function getMe() {
  const session = await getSession();

  return session?.user;
}

export async function deleteSession() {
  const cookieStore = await cookies();

  if (cookieStore.get(APP_SESSION_COOKIE_KEY)) {
    cookieStore.delete(APP_SESSION_COOKIE_KEY);
  }
}

export async function authValidator() {
  const session = await getSession();

  const token = session?.token;

  if (!token) {
    await authService.deleteSession();

    return false;
  }

  const isValid = await authService.verifyToken(token);

  if (isValid.data === null) {
    await authService.deleteSession();

    return false;
  }

  return true;
}

export async function encrypt(payload: TSession) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(payload.expires)
    .sign(key);
}

export async function decrypt(input: string): Promise<TSession> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256'],
  });

  return payload as TSession;
}
