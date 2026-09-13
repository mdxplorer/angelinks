"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("order") || "";
  const catalogSlug = params.get("catalog") || "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-50 to-warm-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Success Animation */}
        <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4D9B64"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1 className="text-3xl font-display font-bold text-warm-900 mb-2">
          Pedido confirmado
        </h1>
        <p className="text-warm-600 mb-6">
          Tu pedido está en proceso. El vendedor te contactará pronto para
          coordinar la entrega.
        </p>

        {/* Order ID */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-warm-200 mb-6">
          <p className="text-xs text-warm-600 uppercase tracking-wider mb-1">
            Número de pedido
          </p>
          <p className="text-lg font-mono font-bold text-accent-600">
            {orderId.slice(0, 16)}
          </p>
        </div>

        {/* Info Cards */}
        <div className="space-y-3 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-warm-200 flex items-start gap-3 text-left">
            <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C17D63"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-warm-800">Te contactarán pronto</p>
              <p className="text-xs text-warm-600">
                El vendedor te escribirá por WhatsApp o te llamará para
                confirmar detalles.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-warm-200 flex items-start gap-3 text-left">
            <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4D9B64"
                strokeWidth="2"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-warm-800">Pago contraentrega</p>
              <p className="text-xs text-warm-600">
                Pagas al recibir tu pedido. Sin anticipos.
              </p>
            </div>
          </div>
        </div>

        {catalogSlug && (
          <Link
            href={`/c/${catalogSlug}`}
            className="inline-flex items-center gap-2 text-accent-600 hover:text-accent-700 font-medium text-sm transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Volver al catálogo
          </Link>
        )}

        <div className="mt-8">
          <Logo size="sm" className="justify-center" />
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-accent-500 border-t-transparent rounded-full" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
