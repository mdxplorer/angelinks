"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import type { Order } from "@/types";
import { demoProducts } from "@/lib/demo-data";

function StatCard({ label, value, sub, accent = false }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-warm-200">
      <p className="text-xs text-warm-600 uppercase tracking-wider">{label}</p>
      <p className={`text-2xl sm:text-3xl font-display font-bold mt-1 ${accent ? "text-accent-600" : "text-warm-800"}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-warm-500 mt-1">{sub}</p>}
    </div>
  );
}

function MiniBar({ value, max, label, amount }: { value: number; max: number; label: string; amount: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-warm-600 w-28 sm:w-40 truncate">{label}</span>
      <div className="flex-1 h-3 bg-warm-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-400 to-accent-500 rounded-full transition-all duration-500"
          style={{ width: `${Math.max(pct, 4)}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-warm-700 w-16 text-right tabular-nums">{amount}</span>
    </div>
  );
}

export default function AnalyticsPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []));
  }, []);

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
    const avgOrder = orders.length > 0 ? totalRevenue / orders.length : 0;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    const pending = orders.filter((o) => o.status === "pending").length;

    // Products sold count
    const productCounts: Record<string, { name: string; qty: number; revenue: number }> = {};
    for (const order of orders) {
      for (const item of order.items || []) {
        if (!productCounts[item.product_id]) {
          productCounts[item.product_id] = { name: item.product_name, qty: 0, revenue: 0 };
        }
        productCounts[item.product_id].qty += item.quantity;
        productCounts[item.product_id].revenue += item.unit_price * item.quantity;
      }
    }
    const topProducts = Object.values(productCounts)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Orders by day of week
    const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const byDay = new Array(7).fill(0);
    for (const order of orders) {
      const day = new Date(order.created_at).getDay();
      byDay[day]++;
    }

    // Cities
    const cityCounts: Record<string, number> = {};
    for (const order of orders) {
      const city = order.customer_city || "Sin ciudad";
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    }
    const topCities = Object.entries(cityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return { totalRevenue, avgOrder, delivered, pending, topProducts, byDay, dayNames, topCities };
  }, [orders]);

  const hasData = orders.length > 0;

  return (
    <>
      <main className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-8 space-y-6">
        {/* Key Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Ventas totales"
            value={`$${stats.totalRevenue.toLocaleString("es-CO")}`}
            accent
          />
          <StatCard
            label="Pedidos"
            value={orders.length.toString()}
            sub={`${stats.pending} pendientes`}
          />
          <StatCard
            label="Promedio por pedido"
            value={`$${Math.round(stats.avgOrder).toLocaleString("es-CO")}`}
          />
          <StatCard
            label="Entregados"
            value={stats.delivered.toString()}
            sub={orders.length > 0 ? `${Math.round((stats.delivered / orders.length) * 100)}% del total` : "—"}
          />
        </div>

        {hasData ? (
          <>
            {/* Top Products */}
            {stats.topProducts.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6">
                <h2 className="font-display font-semibold text-warm-800 mb-4">Productos más vendidos</h2>
                <div className="space-y-3">
                  {stats.topProducts.map((p, i) => (
                    <MiniBar
                      key={i}
                      label={p.name}
                      value={p.revenue}
                      max={stats.topProducts[0]?.revenue || 1}
                      amount={`$${p.revenue.toLocaleString("es-CO")}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Orders by Day */}
            <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6">
              <h2 className="font-display font-semibold text-warm-800 mb-4">Pedidos por día de la semana</h2>
              <div className="flex items-end gap-2 h-32">
                {stats.byDay.map((count, i) => {
                  const max = Math.max(...stats.byDay, 1);
                  const pct = (count / max) * 100;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs font-medium text-warm-600 tabular-nums">{count}</span>
                      <div className="w-full bg-warm-100 rounded-t-md" style={{ height: "80px" }}>
                        <div
                          className="w-full bg-gradient-to-t from-brand-400 to-brand-300 rounded-t-md transition-all duration-500"
                          style={{ height: `${Math.max(pct, 5)}%`, marginTop: `${100 - Math.max(pct, 5)}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-warm-600 font-medium">{stats.dayNames[i]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Cities */}
            {stats.topCities.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-6">
                <h2 className="font-display font-semibold text-warm-800 mb-4">Ciudades con más pedidos</h2>
                <div className="space-y-3">
                  {stats.topCities.map(([city, count], i) => (
                    <MiniBar
                      key={i}
                      label={city}
                      value={count}
                      max={stats.topCities[0]?.[1] || 1}
                      amount={`${count} pedido${count !== 1 ? "s" : ""}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-warm-200 p-12 text-center">
            <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C17D63" strokeWidth="1.5">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
            </div>
            <p className="text-warm-600 font-medium">Aún no hay datos para mostrar</p>
            <p className="text-warm-500 text-sm mt-1">
              Comparte tu catálogo y las estadísticas aparecerán aquí cuando recibas pedidos
            </p>
            <Link
              href="/dashboard/mensajes"
              className="inline-flex mt-4 text-accent-600 hover:text-accent-700 font-medium text-sm"
            >
              Compartir catálogo →
            </Link>
          </div>
        )}

        {/* Motivational note */}
        <div className="bg-secondary-50 rounded-2xl p-5 border border-secondary-200 text-center">
          <p className="text-sm text-secondary-700 font-medium">
            🌱 Cada pedido es un paso más en tu negocio. ¡Sigue compartiendo!
          </p>
        </div>
      </main>
    </>
  );
}
