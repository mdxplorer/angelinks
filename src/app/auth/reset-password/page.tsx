"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import AuthInput from "@/components/auth/AuthInput";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ password: "", confirmPassword: "" });

  const validate = () => {
    const e: Record<string, string> = {};
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
    setDone(true);
  };

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (done) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-secondary-600">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <h1 className="font-display text-2xl font-bold text-warm-900">
          ¡Contraseña actualizada!
        </h1>
        <p className="mt-3 text-sm text-warm-600 leading-relaxed">
          Tu contraseña fue cambiada exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.
        </p>

        <Link
          href="/auth/login"
          className="mt-8 block w-full bg-accent-500 hover:bg-accent-600 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm text-center"
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-warm-900">
        Nueva contraseña
      </h1>
      <p className="mt-2 text-sm text-warm-600 leading-relaxed">
        Elige una contraseña segura para tu cuenta
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
        <AuthInput
          label="Nueva contraseña"
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
          placeholder="Repite tu nueva contraseña"
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
              Guardando...
            </span>
          ) : (
            "Guardar nueva contraseña"
          )}
        </button>
      </form>
    </div>
  );
}
