"use client";

import { useState, useEffect, useCallback } from "react";
import type { Order } from "@/types";
import Toast from "@/components/shared/Toast";

const statusConfig = {
  pending: { label: "Pendiente", bg: "bg-amber-100", text: "text-amber-700", next: "confirmed" as const, nextLabel: "Confirmar" },
  confirmed: { label: "Confirmado", bg: "bg-blue-100", text: "text-blue-700", next: "delivered" as const, nextLabel: "Marcar entregado" },
  delivered: { label: "Entregado", bg: "bg-secondary-100", text: "text-secondary-700", next: null, nextLabel: "" },
  cancelled: { label: "Cancelado", bg: "bg-red-100", text: "text-red-700", next: null, nextLabel: "" },
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []));
  }, []);

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const updateStatus = useCallback((orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    const label = statusConfig[newStatus].label.toLowerCase();
    setToast({ visible: true, message: `Pedido marcado como ${label}` });
  }, []);

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const callCustomer = (phone: string) => {
    window.open(`tel:${phone}`, "_self");
  };

  const whatsappCustomer = (phone: string, name: string) => {
    const clean = phone.replace(/\s+/g, "").replace(/^\+/, "");
    const msg = encodeURIComponent(`Hola ${name}, te escribo sobre tu pedido en AngeLinks.`);
    window.open(`https://wa.me/${clean}?text=${msg}`, "_blank");
  };

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 md:pb-8">
        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
          {[
            { key: "all", label: "Todos" },
            { key: "pending", label: "Pendientes" },
            { key: "confirmed", label: "Confirmados" },
            { key: "delivered", label: "Entregados" },
            { key: "cancelled", label: "Cancelados" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.key
                  ? "bg-accent-500 text-white"
                  : "bg-white text-warm-600 hover:bg-warm-200 border border-warm-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filtered.map((order) => {
            const config = statusConfig[order.status];
            const isExpanded = expandedOrder === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-warm-200 overflow-hidden"
              >
                {/* Main row — tappable */}
                <button
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  className="w-full p-5 text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-warm-800">{order.customer_name}</h3>
                      <p className="text-sm text-warm-600">
                        {order.customer_phone} — {order.customer_city}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="text-lg font-bold text-accent-600 tabular-nums">
                        ${order.total.toLocaleString("es-CO")}
                      </p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${config.bg} ${config.text}`}>
                        {config.label}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-warm-500">
                    {new Date(order.created_at).toLocaleDateString("es-CO", {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    {" · "}
                    {(order.items || []).length} producto{(order.items || []).length !== 1 ? "s" : ""}
                  </p>
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="px-5 pb-5 space-y-4 border-t border-warm-100 pt-4">
                    {/* Items */}
                    {order.items && order.items.length > 0 && (
                      <div className="bg-warm-50 rounded-xl p-3 space-y-1.5">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-warm-600">
                              {item.quantity}× {item.product_name}
                            </span>
                            <span className="font-medium text-warm-700 tabular-nums">
                              ${(item.unit_price * item.quantity).toLocaleString("es-CO")}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Address */}
                    <div className="text-sm">
                      <p className="text-warm-500 text-xs uppercase tracking-wider mb-1">Dirección de entrega</p>
                      <p className="text-warm-700">{order.customer_address}</p>
                      <p className="text-warm-500">{order.customer_city}</p>
                    </div>

                    {order.customer_notes && (
                      <div className="text-sm">
                        <p className="text-warm-500 text-xs uppercase tracking-wider mb-1">Nota del cliente</p>
                        <p className="text-warm-700 italic">{order.customer_notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {/* Status advancement */}
                      {config.next && (
                        <button
                          onClick={() => updateStatus(order.id, config.next!)}
                          className="bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                        >
                          {config.nextLabel}
                        </button>
                      )}

                      {/* Cancel button for pending/confirmed */}
                      {(order.status === "pending" || order.status === "confirmed") && (
                        <button
                          onClick={() => updateStatus(order.id, "cancelled")}
                          className="bg-warm-100 hover:bg-red-50 text-red-500 hover:text-red-600 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                        >
                          Cancelar
                        </button>
                      )}

                      {/* Contact buttons */}
                      <button
                        onClick={() => whatsappCustomer(order.customer_phone, order.customer_name)}
                        className="bg-secondary-100 hover:bg-secondary-200 text-secondary-700 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </button>
                      <button
                        onClick={() => callCustomer(order.customer_phone)}
                        className="bg-warm-100 hover:bg-warm-200 text-warm-600 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                        Llamar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-warm-200 rounded-2xl flex items-center justify-center mx-auto mb-4 text-warm-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <p className="text-warm-600">
                No hay pedidos {filter !== "all" ? "con este estado" : ""}
              </p>
              <p className="text-warm-500 text-sm mt-1">
                Comparte tu catálogo para empezar a recibir pedidos
              </p>
            </div>
          )}
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
