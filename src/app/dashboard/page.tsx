"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Catalog, Order } from "@/types";

export default function DashboardPage() {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/catalogs")
      .then((r) => r.json())
      .then((d) => setCatalogs(d.catalogs || []));
    fetch("/api/orders")
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []));
  }, []);

  const appUrl = typeof window !== "undefined" ? window.location.origin : "";

  const copyLink = (slug: string) => {
    const url = `${appUrl}/c/${slug}`;
    navigator.clipboard.writeText(url);
    setCopied(slug);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareWhatsApp = (slug: string, name: string) => {
    const url = `${appUrl}/c/${slug}`;
    const text = encodeURIComponent(
      `Mira el catálogo de ${name}. Elige lo que quieras y haz tu pedido directo:\n${url}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending");

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-200">
            <p className="text-xs text-warm-600 uppercase tracking-wider">
              Catálogos
            </p>
            <p className="text-3xl font-display font-bold mt-1 text-warm-800">{catalogs.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-200">
            <p className="text-xs text-warm-600 uppercase tracking-wider">
              Pedidos
            </p>
            <p className="text-3xl font-display font-bold mt-1 text-warm-800">{orders.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-200">
            <p className="text-xs text-warm-600 uppercase tracking-wider">
              Pendientes
            </p>
            <p className="text-3xl font-display font-bold mt-1 text-amber-600">
              {pendingOrders.length}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-200">
            <p className="text-xs text-warm-600 uppercase tracking-wider">
              Ventas totales
            </p>
            <p className="text-3xl font-display font-bold mt-1 text-accent-600">
              ${totalRevenue.toLocaleString("es-CO")}
            </p>
          </div>
        </div>

        {/* Catalogs */}
        <section className="mb-8">
          <h2 className="text-lg font-display font-bold mb-4 text-warm-800">Mis catálogos</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {catalogs.map((catalog) => (
              <div
                key={catalog.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-warm-200"
              >
                <div className="h-32 bg-gradient-to-br from-brand-300 to-brand-500 relative overflow-hidden">
                  <img
                    src={catalog.cover_image}
                    alt={catalog.name}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-0.5 rounded-full text-warm-700">
                      {catalog.brand}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-warm-800">{catalog.name}</h3>
                  <p className="text-xs text-warm-600 mt-1 line-clamp-2">
                    {catalog.description}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => copyLink(catalog.slug)}
                      className={`flex-1 text-xs font-medium px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                        copied === catalog.slug
                          ? "bg-secondary-100 text-secondary-700"
                          : "bg-warm-100 hover:bg-warm-200 text-warm-700"
                      }`}
                    >
                      {copied === catalog.slug ? (
                        <>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          Copiado
                        </>
                      ) : (
                        <>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                          </svg>
                          Copiar link
                        </>
                      )}
                    </button>
                    <button
                      onClick={() =>
                        shareWhatsApp(catalog.slug, catalog.name)
                      }
                      className="flex-1 text-xs font-medium px-3 py-2 rounded-lg bg-secondary-100 hover:bg-secondary-200 text-secondary-700 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </button>
                    <Link
                      href={`/c/${catalog.slug}`}
                      target="_blank"
                      className="w-10 h-10 rounded-lg bg-warm-100 hover:bg-warm-200 flex items-center justify-center text-warm-600 transition-colors flex-shrink-0"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Orders */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold text-warm-800">Pedidos recientes</h2>
            {orders.length > 0 && (
              <Link
                href="/dashboard/orders"
                className="text-sm text-accent-600 hover:text-accent-700 font-medium"
              >
                Ver todos
              </Link>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-warm-200">
              <div className="w-16 h-16 bg-warm-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <p className="text-warm-600 text-sm">Aún no tienes pedidos</p>
              <p className="text-warm-500 text-xs mt-1">
                Comparte tu catálogo para empezar a recibir pedidos
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-warm-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-warm-50 text-xs text-warm-600 uppercase tracking-wider">
                      <th className="text-left p-4">Cliente</th>
                      <th className="text-left p-4">Ciudad</th>
                      <th className="text-left p-4">Total</th>
                      <th className="text-left p-4">Estado</th>
                      <th className="text-left p-4">Fecha</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-warm-100">
                    {orders.slice(0, 10).map((order) => (
                      <tr key={order.id} className="hover:bg-warm-50/50">
                        <td className="p-4">
                          <p className="text-sm font-medium text-warm-800">
                            {order.customer_name}
                          </p>
                          <p className="text-xs text-warm-600">
                            {order.customer_phone}
                          </p>
                        </td>
                        <td className="p-4 text-sm text-warm-600">
                          {order.customer_city}
                        </td>
                        <td className="p-4 text-sm font-semibold text-accent-600">
                          ${order.total.toLocaleString("es-CO")}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "pending"
                                ? "bg-amber-100 text-amber-700"
                                : order.status === "confirmed"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "delivered"
                                ? "bg-secondary-100 text-secondary-700"
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
                        </td>
                        <td className="p-4 text-xs text-warm-600">
                          {new Date(order.created_at).toLocaleDateString(
                            "es-CO",
                            {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
