"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import AuthInput from "@/components/auth/AuthInput";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("El correo es obligatorio");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Ingresa un correo válido");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-secondary-600">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>

        <h1 className="font-display text-2xl font-bold text-warm-900">
          ¡Revisa tu correo!
        </h1>
        <p className="mt-3 text-sm text-warm-600 leading-relaxed">
          Te enviamos un enlace de recuperación a{" "}
          <span className="font-medium text-warm-700">{email}</span>.
          Revisa también tu carpeta de spam.
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => { setSent(false); setLoading(false); }}
            className="w-full bg-warm-100 hover:bg-warm-200 text-warm-700 font-medium py-3 rounded-xl transition-colors text-sm"
          >
            Enviar de nuevo
          </button>
          <Link
            href="/auth/login"
            className="block w-full text-center text-sm text-accent-600 hover:text-accent-700 font-medium transition-colors py-2"
          >
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/auth/login"
        className="inline-flex items-center gap-1.5 text-sm text-warm-600 hover:text-warm-800 transition-colors mb-6"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Volver
      </Link>

      <h1 className="font-display text-2xl font-bold text-warm-900">
        Recupera tu contraseña
      </h1>
      <p className="mt-2 text-sm text-warm-600 leading-relaxed">
        Ingresa tu correo electrónico y te enviaremos un enlace para crear una nueva contraseña
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
        <AuthInput
          label="Correo electrónico"
          type="email"
          placeholder="tu@correo.com"
          autoComplete="email"
          value={email}
          onChange={(e) => { setEmail(e.currentTarget.value); if (error) setError(""); }}
          error={error}
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
              Enviando...
            </span>
          ) : (
            "Enviar enlace de recuperación"
          )}
        </button>
      </form>
    </div>
  );
}
