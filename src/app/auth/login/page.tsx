"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthInput from "@/components/auth/AuthInput";
import SocialButton from "@/components/auth/SocialButton";
import AuthDivider from "@/components/auth/AuthDivider";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email.trim()) e.email = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Ingresa un correo válido";
    if (!form.password) e.password = "La contraseña es obligatoria";
    else if (form.password.length < 6) e.password = "Mínimo 6 caracteres";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setToast("¡Bienvenida! Redirigiendo...");
    setTimeout(() => router.push("/dashboard"), 1000);
  };

  const handleGoogle = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setToast("¡Bienvenida! Redirigiendo...");
    setTimeout(() => router.push("/dashboard"), 1000);
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <>
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-secondary-600 text-white px-6 py-3 rounded-xl shadow-lg text-sm font-medium animate-[fadeSlideIn_0.3s_ease-out]"
        >
          {toast}
        </div>
      )}

      <div>
        <h1 className="font-display text-2xl font-bold text-warm-900">
          Inicia sesión
        </h1>
        <p className="mt-2 text-sm text-warm-600">
          Accede a tu cuenta para gestionar tus catálogos
        </p>

        <div className="mt-8 space-y-6">
          <SocialButton provider="google" onClick={handleGoogle} disabled={loading} />

          <AuthDivider />

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <AuthInput
              label="Correo electrónico"
              type="email"
              placeholder="tu@correo.com"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.currentTarget.value)}
              error={errors.email}
              required
            />

            <AuthInput
              label="Contraseña"
              isPassword
              placeholder="Tu contraseña"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => update("password", e.currentTarget.value)}
              error={errors.password}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-warm-300 text-accent-500 focus:ring-accent-400"
                />
                <span className="text-sm text-warm-600">Recordar sesión</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-accent-600 hover:text-accent-700 font-medium transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-warm-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Ingresando...
                </span>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-warm-600">
          ¿No tienes cuenta?{" "}
          <Link
            href="/auth/register"
            className="text-accent-600 hover:text-accent-700 font-semibold transition-colors"
          >
            Regístrate gratis
          </Link>
        </p>
      </div>
    </>
  );
}
