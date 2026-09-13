"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Avatar from "@/components/shared/Avatar";
import Toast from "@/components/shared/Toast";

export default function ProfilePage() {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" as const });
  const [form, setForm] = useState({
    name: "Angela Restrepo",
    email: "angela.restrepo@gmail.com",
    phone: "+57 311 456 7890",
    businessName: "Belleza con Ange",
    city: "Bogotá",
    bio: "Consultora independiente de O Boticário y Yanbal. Más de 3 años ayudando a mis clientas a encontrar su fragancia perfecta y los mejores productos de cuidado personal. ¡Escríbeme por WhatsApp!",
    instagram: "@bellezaconange",
    whatsapp: "+57 311 456 7890",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = useCallback(async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSaving(false);
    setToast({ visible: true, message: "Perfil guardado correctamente", type: "success" });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <>
      <header className="bg-white border-b border-warm-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            href="/dashboard"
            className="w-10 h-10 rounded-xl bg-warm-100 hover:bg-warm-200 flex items-center justify-center transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="font-display font-bold text-lg text-warm-800">Tu perfil</h1>
            <p className="text-xs text-warm-600">Información de tu negocio</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Avatar Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6 flex flex-col items-center gap-4">
          <Avatar name={form.name} size="xl" />
          <div className="text-center">
            <p className="font-display font-bold text-lg text-warm-800">{form.name || "Tu nombre"}</p>
            <p className="text-sm text-warm-600">
              {form.businessName || "Vendedora por catálogo"}
            </p>
          </div>
          <button className="text-sm text-accent-600 hover:text-accent-700 font-medium transition-colors">
            Cambiar foto
          </button>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6">
          <h2 className="font-display font-semibold text-warm-800 mb-4">Datos personales</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="profile-name" className="block text-sm font-medium text-warm-700 mb-1.5">
                Nombre completo
              </label>
              <input
                id="profile-name"
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <label htmlFor="profile-email" className="block text-sm font-medium text-warm-700 mb-1.5">
                Correo electrónico
              </label>
              <input
                id="profile-email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm"
                placeholder="tu@correo.com"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="profile-phone" className="block text-sm font-medium text-warm-700 mb-1.5">
                  Teléfono / WhatsApp
                </label>
                <input
                  id="profile-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm"
                  placeholder="300 123 4567"
                />
              </div>
              <div>
                <label htmlFor="profile-city" className="block text-sm font-medium text-warm-700 mb-1.5">
                  Ciudad
                </label>
                <input
                  id="profile-city"
                  type="text"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm"
                  placeholder="Bogotá, Medellín..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6">
          <h2 className="font-display font-semibold text-warm-800 mb-4">Tu negocio</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="profile-biz" className="block text-sm font-medium text-warm-700 mb-1.5">
                Nombre de tu negocio <span className="text-warm-500">(opcional)</span>
              </label>
              <input
                id="profile-biz"
                type="text"
                value={form.businessName}
                onChange={(e) => update("businessName", e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm"
                placeholder="Ej: Belleza con María, Catálogos García..."
              />
              <p className="text-xs text-warm-500 mt-1">Aparece en tu perfil público y catálogos</p>
            </div>
            <div>
              <label htmlFor="profile-bio" className="block text-sm font-medium text-warm-700 mb-1.5">
                Descripción <span className="text-warm-500">(opcional)</span>
              </label>
              <textarea
                id="profile-bio"
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm resize-none"
                placeholder="Cuéntale a tus clientes sobre ti y lo que vendes..."
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6">
          <h2 className="font-display font-semibold text-warm-800 mb-4">Redes sociales</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="profile-wa" className="block text-sm font-medium text-warm-700 mb-1.5">
                WhatsApp
              </label>
              <div className="relative">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary-500" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <input
                  id="profile-wa"
                  type="tel"
                  value={form.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm"
                  placeholder="+57 300 123 4567"
                />
              </div>
            </div>
            <div>
              <label htmlFor="profile-ig" className="block text-sm font-medium text-warm-700 mb-1.5">
                Instagram <span className="text-warm-500">(opcional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-500 text-sm">@</span>
                <input
                  id="profile-ig"
                  type="text"
                  value={form.instagram}
                  onChange={(e) => update("instagram", e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm"
                  placeholder="tu_usuario"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="sticky bottom-0 bg-gradient-to-t from-warm-100 via-warm-100 to-warm-100/0 pt-4 pb-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-warm-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors text-base"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Guardando...
              </span>
            ) : (
              "Guardar cambios"
            )}
          </button>
        </div>

        {/* Settings Link */}
        <div className="text-center pb-8">
          <Link
            href="/dashboard/settings"
            className="text-sm text-warm-600 hover:text-warm-800 transition-colors"
          >
            Configuración de cuenta →
          </Link>
        </div>
      </main>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={closeToast}
      />
    </>
  );
}
