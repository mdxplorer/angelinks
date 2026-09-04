"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Order } from "@/types";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []));
  }, []);

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="font-bold text-lg">Pedidos</h1>
            <p className="text-xs text-gray-500">
              {orders.length} pedidos en total
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
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
                  ? "bg-brand-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filtered.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{order.customer_name}</h3>
                  <p className="text-sm text-gray-500">
                    {order.customer_phone} — {order.customer_city}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {order.customer_address}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-brand-700">
                    ${order.total.toLocaleString("es-CO")}
                  </p>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                      order.status === "pending"
                        ? "bg-amber-100 text-amber-700"
                        : order.status === "confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status === "pending"
                      ? "Pendiente"
                      : order.status === "confirmed"
                      ? "Confirmado"
                      : order.status === "delivered"
                      ? "Entregado"
                      : "Cancelado"}
                  </span>
                </div>
              </div>

              {order.items && order.items.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-3 space-y-1">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-gray-600">
                        {item.quantity}x {item.product_name}
                      </span>
                      <span className="font-medium">
                        $
                        {(item.unit_price * item.quantity).toLocaleString(
                          "es-CO"
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {order.customer_notes && (
                <p className="text-xs text-gray-500 mt-3 italic">
                  Nota: {order.customer_notes}
                </p>
              )}

              <p className="text-xs text-gray-400 mt-3">
                {new Date(order.created_at).toLocaleDateString("es-CO", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p>No hay pedidos {filter !== "all" ? "con este estado" : ""}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
