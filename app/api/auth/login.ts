import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useAuthStore } from "@/app/store/authStore";
import { BACKEND_URL } from "@/app/api/common/api-client/app.api";
import { handleError } from "@/app/api/common/utils/errorHandle";
import {AuthResponse} from "@/app/api/auth/interfaces/login.interface";

export default async function Login(email: string, password: string) {
  try {
    const { setToken } = useAuthStore.getState();
    const { data } = await axios.post<AuthResponse>(`${BACKEND_URL}/auth/login`, { email, password }, {
      headers: { 'Content-Type': 'application/json' }
    });
    setToken(data.access_token);
    setCookie('auth-token', data.access_token, {
      httpOnly: false,
      sameSite: 'strict',
      path: '/',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 2),
    });
    return { success: true, message: 'Inicio de sesión exitoso' };
  } catch (e) {
    return { success: false, message: handleError(e).error };
  }
}