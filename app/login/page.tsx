"use client";

import { useState, FormEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      toast.error("Error en el inicio de sesión");
      setLoading(false);
      return;
    }
    toast.success("Inicio de sesión exitoso");
    router.push("/dashboard/client");
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-900 to-black">
      <div className="bg-white/90 border border-blue-900 shadow-2xl rounded-2xl p-10 w-full max-w-md backdrop-blur-md
        transform transition-all duration-700 ease-out
        hover:scale-105 hover:-translate-y-1">
        <div className="space-y-6 text-center">
          <h2 className="text-3xl font-bold text-black drop-shadow">Inicio de Sesión</h2>
          <p className="text-lg text-gray-700">Ingrese su email y contraseña para acceder</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div>
            <div className="relative">
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
                className="text-lg p-4 pr-12 w-full border-2 border-blue-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
              />
              <Mail
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-blue-500 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <Input
                placeholder="Contraseña"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-lg p-4 pr-12 w-full border-2 border-blue-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 flex items-center justify-center w-10 h-10"
                aria-label={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                {showPassword ? (
                  <EyeOff className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Eye className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 hover:from-blue-800 hover:to-blue-700 text-xl py-4 font-bold shadow-lg transition-all duration-200"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                Iniciando Sesión...
              </span>
            ) : "Iniciar Sesión"}
          </Button>
        </form>
      </div>
    </div>
  );
}
