"use client";

import { useState, useEffect } from "react";
import type { Catalog } from "@/types";
import Toast from "@/components/shared/Toast";

const templates = [
  {
    id: "new-catalog",
    label: "Nuevo catálogo",
    emoji: "✨",
    template: (name: string, url: string) =>
      `✨ ¡Nuevo catálogo disponible!\n\nHola, ya puedes ver mi catálogo de ${name}. Elige lo que más te guste y haz tu pedido directo desde el link:\n\n👉 ${url}\n\nPago contraentrega — pagas al recibir. ¡Sin riesgo!`,
  },
  {
    id: "reminder",
    label: "Recordatorio",
    emoji: "💫",
    template: (name: string, url: string) =>
      `💫 ¿Ya viste mi catálogo de ${name}?\n\nTodavía tienes chance de pedir. Mira los productos aquí:\n\n👉 ${url}\n\n¿Necesitas ayuda eligiendo? ¡Escríbeme!`,
  },
  {
    id: "promo",
    label: "Promoción",
    emoji: "🔥",
    template: (name: string, url: string) =>
      `🔥 ¡Ofertas especiales en ${name}!\n\nAprovecha antes de que se acaben. Mira los precios:\n\n👉 ${url}\n\nPago contraentrega. Te lo llevo a tu casa.`,
  },
  {
    id: "closing",
    label: "Cierre de campaña",
    emoji: "⏰",
    template: (name: string, url: string) =>
      `⏰ ¡Últimos días!\n\nEl catálogo de ${name} está por cerrar. Si hay algo que te gustó, este es el momento:\n\n👉 ${url}\n\nHaz tu pedido antes de que se acaben los productos.`,
  },
  {
    id: "personal",
    label: "Personal",
    emoji: "💝",
    template: (name: string, url: string) =>
      `💝 Hola, ¿cómo estás?\n\nTe quería mostrar algo que puede gustarte de mi catálogo ${name}:\n\n👉 ${url}\n\nSi necesitas algo especial, me dices y te ayudo a elegir.`,
  },
];

export default function MensajesPage() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [selectedCatalog, setSelectedCatalog] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [customMessage, setCustomMessage] = useState("");
  const [toast, setToast] = useState({ visible: false, message: "" });

  useEffect(() => {
    fetch("/api/catalogs")
      .then((r) => r.json())
      .then((d) => {
        const cats = d.catalogs || [];
        setCatalogs(cats);
        if (cats.length > 0) setSelectedCatalog(cats[0].slug);
      });
  }, []);

  const appUrl = typeof window !== "undefined" ? window.location.origin : "";
  const catalog = catalogs.find((c) => c.slug === selectedCatalog);
  const catalogUrl = `${appUrl}/c/${selectedCatalog}`;
  const template = templates.find((t) => t.id === selectedTemplate);
  const previewMessage = template ? template.template(catalog?.name || "Mi Catálogo", catalogUrl) : "";
  const finalMessage = customMessage || previewMessage;

  const copyMessage = () => {
    navigator.clipboard.writeText(finalMessage);
    setToast({ visible: true, message: "Mensaje copiado al portapapeles" });
  };

  const sendWhatsApp = () => {
    const encoded = encodeURIComponent(finalMessage);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  const closeToast = () => setToast((prev) => ({ ...prev, visible: false }));

  return (
    <>
      <main className="max-w-2xl mx-auto px-4 py-8 pb-24 md:pb-8 space-y-6">
        {/* Select Catalog */}
        <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6">
          <h2 className="font-display font-semibold text-warm-800 mb-3">Elige tu catálogo</h2>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {catalogs.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => {
                  setSelectedCatalog(cat.slug);
                  setCustomMessage("");
                }}
                className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  selectedCatalog === cat.slug
                    ? "bg-accent-500 text-white"
                    : "bg-warm-100 text-warm-600 hover:bg-warm-200"
                }`}
              >
                {cat.brand}
              </button>
            ))}
          </div>
        </div>

        {/* Template Selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6">
          <h2 className="font-display font-semibold text-warm-800 mb-3">Tipo de mensaje</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTemplate(t.id);
                  setCustomMessage("");
                }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  selectedTemplate === t.id
                    ? "bg-brand-100 text-brand-700 ring-2 ring-brand-400"
                    : "bg-warm-50 text-warm-600 hover:bg-warm-100"
                }`}
              >
                <span>{t.emoji}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message Preview & Edit */}
        <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-semibold text-warm-800">Tu mensaje</h2>
            {customMessage && (
              <button
                onClick={() => setCustomMessage("")}
                className="text-xs text-accent-600 hover:text-accent-700 font-medium"
              >
                Restaurar plantilla
              </button>
            )}
          </div>

          {/* WhatsApp-style preview */}
          <div className="bg-[#E8DFCF] rounded-2xl p-4 mb-4">
            <div className="bg-[#DCF8C6] rounded-xl rounded-tr-sm p-3 max-w-[90%] ml-auto shadow-sm">
              <textarea
                value={customMessage || previewMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={8}
                className="w-full bg-transparent text-sm text-gray-800 resize-none focus:outline-none leading-relaxed"
              />
              <p className="text-[10px] text-gray-500 text-right mt-1">
                {new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>

          <p className="text-xs text-warm-500 mb-4">
            Toca el texto para editarlo. El link de tu catálogo se incluye automáticamente.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={sendWhatsApp}
              className="flex-1 bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Enviar por WhatsApp
            </button>
            <button
              onClick={copyMessage}
              className="px-4 py-3.5 rounded-xl bg-warm-100 hover:bg-warm-200 text-warm-700 transition-colors"
              title="Copiar mensaje"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-brand-50 rounded-2xl p-5 border border-brand-200">
          <h3 className="font-display font-semibold text-brand-700 text-sm mb-2">💡 Consejos para vender más</h3>
          <ul className="space-y-1.5 text-xs text-brand-600">
            <li>• Envía el catálogo a tus grupos de WhatsApp en la mañana</li>
            <li>• Usa la plantilla de recordatorio 2 días después del primer envío</li>
            <li>• Personaliza el mensaje para clientes frecuentes</li>
            <li>• Publica el link en tus estados de WhatsApp cada 3 días</li>
          </ul>
        </div>
      </main>

      <Toast
        message={toast.message}
        type="success"
        visible={toast.visible}
        onClose={closeToast}
      />
    </>
  );
}
