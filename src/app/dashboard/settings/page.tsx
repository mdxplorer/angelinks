"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Toast from "@/components/shared/Toast";

function Toggle({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        checked ? "bg-accent-500" : "bg-warm-300"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" as "success" | "error" | "info" });
  const [showDeactivate, setShowDeactivate] = useState(false);
  const [notifications, setNotifications] = useState({
    emailOnOrder: true,
    whatsappNotify: false,
  });
  const [catalogDefaults, setCatalogDefaults] = useState({
    paymentLabel: "Contraentrega",
    deliveryZone: "",
  });

  const handleSave = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 800));
    setToast({ visible: true, message: "Configuración guardada", type: "success" });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <>
      <header className="bg-white border-b border-warm-200">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            href="/dashboard/profile"
            className="w-10 h-10 rounded-xl bg-warm-100 hover:bg-warm-200 flex items-center justify-center transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="font-display font-bold text-lg text-warm-800">Configuración</h1>
            <p className="text-xs text-warm-600">Preferencias de tu cuenta</p>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6">
          <h2 className="font-display font-semibold text-warm-800 mb-1">Notificaciones</h2>
          <p className="text-sm text-warm-600 mb-5">Elige cómo quieres enterarte de tus pedidos</p>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="toggle-email" className="text-sm font-medium text-warm-700 cursor-pointer">
                  Email al recibir pedido
                </label>
                <p className="text-xs text-warm-500 mt-0.5">
                  Te enviamos un correo cada vez que alguien hace un pedido
                </p>
              </div>
              <Toggle
                id="toggle-email"
                checked={notifications.emailOnOrder}
                onChange={(v) => {
                  setNotifications((p) => ({ ...p, emailOnOrder: v }));
                  handleSave();
                }}
              />
            </div>

            <div className="border-t border-warm-100" />

            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="toggle-wa" className="text-sm font-medium text-warm-700 cursor-pointer">
                  Notificación por WhatsApp
                </label>
                <p className="text-xs text-warm-500 mt-0.5">
                  Recibe un mensaje de WhatsApp con cada nuevo pedido
                </p>
              </div>
              <Toggle
                id="toggle-wa"
                checked={notifications.whatsappNotify}
                onChange={(v) => {
                  setNotifications((p) => ({ ...p, whatsappNotify: v }));
                  handleSave();
                }}
              />
            </div>
          </div>
        </div>

        {/* Catalog Defaults */}
        <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6">
          <h2 className="font-display font-semibold text-warm-800 mb-1">Valores por defecto</h2>
          <p className="text-sm text-warm-600 mb-5">Se aplican automáticamente al crear un nuevo catálogo</p>

          <div className="space-y-4">
            <div>
              <label htmlFor="setting-payment" className="block text-sm font-medium text-warm-700 mb-1.5">
                Método de pago
              </label>
              <select
                id="setting-payment"
                value={catalogDefaults.paymentLabel}
                onChange={(e) => {
                  setCatalogDefaults((p) => ({ ...p, paymentLabel: e.target.value }));
                  handleSave();
                }}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm bg-white"
              >
                <option value="Contraentrega">Contraentrega (pago al recibir)</option>
                <option value="Transferencia">Transferencia bancaria</option>
                <option value="Nequi">Nequi / Daviplata</option>
              </select>
            </div>

            <div>
              <label htmlFor="setting-zone" className="block text-sm font-medium text-warm-700 mb-1.5">
                Zona de entrega <span className="text-warm-500">(opcional)</span>
              </label>
              <input
                id="setting-zone"
                type="text"
                value={catalogDefaults.deliveryZone}
                onChange={(e) => setCatalogDefaults((p) => ({ ...p, deliveryZone: e.target.value }))}
                onBlur={handleSave}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm"
                placeholder="Ej: Bogotá y alrededores"
              />
              <p className="text-xs text-warm-500 mt-1">Aparece en tu catálogo para que los clientes sepan dónde entregas</p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
          <h2 className="font-display font-semibold text-red-600 mb-1">Zona de riesgo</h2>
          <p className="text-sm text-warm-600 mb-4">Acciones irreversibles sobre tu cuenta</p>

          {!showDeactivate ? (
            <button
              onClick={() => setShowDeactivate(true)}
              className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
            >
              Desactivar mi cuenta
            </button>
          ) : (
            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-sm text-red-700 mb-3">
                ¿Estás segura? Tus catálogos dejarán de estar disponibles y tus clientes no podrán hacer pedidos.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeactivate(false);
                    setToast({ visible: true, message: "Cuenta desactivada (demo)", type: "error" });
                  }}
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                >
                  Sí, desactivar
                </button>
                <button
                  onClick={() => setShowDeactivate(false)}
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-warm-100 hover:bg-warm-200 text-warm-700 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center pb-8">
          <Link
            href="/dashboard/profile"
            className="text-sm text-warm-600 hover:text-warm-800 transition-colors"
          >
            ← Volver al perfil
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
