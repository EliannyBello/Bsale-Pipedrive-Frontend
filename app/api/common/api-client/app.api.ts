import axios from 'axios';
import { decodeJwt } from 'jose';
import { getSession } from 'next-auth/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const HOURS_SESSION = Number(process.env.NEXT_PUBLIC_HOURS_SESSION);
const ITEMS_PER_PAGE = 10;

const getToken = async () => {
  const session = await getSession();
  return session?.access_token ?? '';
};

const apiClient = async () => {
  const token = await getToken();
  if (!token) return null;

  try {
    const { exp } = decodeJwt(token);
    if (exp && exp < Math.floor(Date.now() / 1000)) return null;

    return axios.create({
      baseURL: BACKEND_URL,
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    return null;
  }
};

export { BACKEND_URL, HOURS_SESSION, ITEMS_PER_PAGE, getToken, apiClient };