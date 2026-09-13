"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthInput from "@/components/auth/AuthInput";
import SocialButton from "@/components/auth/SocialButton";
import AuthDivider from "@/components/auth/AuthDivider";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Tu nombre es obligatorio";
    if (!form.email.trim()) e.email = "El correo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Ingresa un correo válido";
    if (!form.phone.trim()) e.phone = "Tu número de WhatsApp es obligatorio";
    else if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Ingresa un número válido (10 dígitos)";
    if (!form.password) e.password = "La contraseña es obligatoria";
    else if (form.password.length < 8) e.password = "Mínimo 8 caracteres";
    if (!form.confirmPassword) e.confirmPassword = "Confirma tu contraseña";
    else if (form.password !== form.confirmPassword) e.confirmPassword = "Las contraseñas no coinciden";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setToast("¡Cuenta creada! Bienvenida a AngeLinks");
    setTimeout(() => router.push("/dashboard"), 1200);
  };

  const handleGoogle = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setToast("¡Cuenta creada! Bienvenida a AngeLinks");
    setTimeout(() => router.push("/dashboard"), 1200);
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
          Crea tu cuenta
        </h1>
        <p className="mt-2 text-sm text-warm-600">
          Empieza a vender con catálogos interactivos
        </p>

        <div className="mt-8 space-y-6">
          <SocialButton provider="google" onClick={handleGoogle} disabled={loading} />

          <AuthDivider />

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <AuthInput
              label="Nombre completo"
              type="text"
              placeholder="¿Cómo te llamas?"
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.currentTarget.value)}
              error={errors.name}
              required
            />

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
              label="WhatsApp"
              type="tel"
              placeholder="300 123 4567"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.currentTarget.value)}
              error={errors.phone}
              hint="Tu número de WhatsApp con código de área (+57)"
              required
            />

            <AuthInput
              label="Contraseña"
              isPassword
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => update("password", e.currentTarget.value)}
              error={errors.password}
              required
            />

            <AuthInput
              label="Confirmar contraseña"
              isPassword
              placeholder="Repite tu contraseña"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(e) => update("confirmPassword", e.currentTarget.value)}
              error={errors.confirmPassword}
              required
            />

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
                  Creando cuenta...
                </span>
              ) : (
                "Crear mi cuenta"
              )}
            </button>

            <p className="text-xs text-warm-600 text-center leading-relaxed">
              Al registrarte aceptas nuestros{" "}
              <a href="#" className="text-accent-600 hover:text-accent-700 underline">términos de servicio</a>{" "}
              y{" "}
              <a href="#" className="text-accent-600 hover:text-accent-700 underline">política de privacidad</a>
            </p>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-warm-600">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/auth/login"
            className="text-accent-600 hover:text-accent-700 font-semibold transition-colors"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </>
  );
}
