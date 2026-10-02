"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { CartItem } from "@/types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  catalogId: string;
  catalogSlug: string;
  total: number;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  catalogId,
  catalogSlug,
  total,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          catalog_id: catalogId,
          customer_name: form.name,
          customer_phone: form.phone,
          customer_address: form.address,
          customer_city: form.city,
          customer_notes: form.notes,
          total,
          items: cart.map((item) => ({
            product_id: item.product.id,
            product_name: item.product.name,
            quantity: item.quantity,
            unit_price: item.product.sale_price,
          })),
        }),
      });

      if (!res.ok) throw new Error("Error al crear pedido");

      const data = await res.json();
      const params = new URLSearchParams({
        order: data.order.id,
        catalog: catalogSlug,
        total: total.toString(),
        customer: form.name,
      });
      if (data.seller?.whatsapp) params.set("wa", data.seller.whatsapp);
      if (data.seller?.name) params.set("seller", data.seller.name);
      router.push(`/order-success?${params.toString()}`);
    } catch {
      alert("Hubo un error al procesar tu pedido. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed inset-x-0 bottom-0 z-50 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-lg sm:w-full">
        <div className="bg-white rounded-t-3xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-warm-200 rounded-t-3xl sm:rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-display font-bold text-warm-800">Confirmar pedido</h2>
                <p className="text-sm text-warm-600 mt-0.5">
                  Pago contraentrega — pagas al recibir
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-warm-100 hover:bg-warm-200 flex items-center justify-center"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Order Summary */}
            <div className="bg-warm-50 rounded-xl p-4 space-y-2">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm"
                >
                  <span className="text-warm-600">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="font-medium text-warm-800">
                    $
                    {(item.product.sale_price * item.quantity).toLocaleString(
                      "es-CO"
                    )}
                  </span>
                </div>
              ))}
              <div className="border-t border-warm-200 pt-2 flex justify-between">
                <span className="font-bold text-warm-800">Total</span>
                <span className="font-bold text-accent-600 text-lg">
                  ${total.toLocaleString("es-CO")}
                </span>
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-1.5">
                Nombre completo *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Tu nombre"
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-700 mb-1.5">
                WhatsApp / Teléfono *
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="300 123 4567"
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-700 mb-1.5">
                Ciudad *
              </label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                placeholder="Ej: Bogotá, Medellín, Cali..."
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-700 mb-1.5">
                Dirección de entrega *
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="Dirección completa"
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-700 mb-1.5">
                Notas adicionales
              </label>
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Indicaciones especiales, horario de entrega, etc."
                rows={2}
                className="w-full px-4 py-3 rounded-xl border border-warm-200 focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-warm-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors text-base mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Procesando...
                </span>
              ) : (
                `Confirmar pedido — $${total.toLocaleString("es-CO")}`
              )}
            </button>

            <p className="text-center text-xs text-warm-500 mt-2">
              Al confirmar, el vendedor recibirá tu pedido y te contactará para
              coordinar la entrega.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
