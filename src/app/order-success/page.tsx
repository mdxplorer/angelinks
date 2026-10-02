"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("order") || "";
  const catalogSlug = params.get("catalog") || "";
  const sellerWhatsapp = params.get("wa") || "";
  const sellerName = params.get("seller") || "el vendedor";
  const totalStr = params.get("total") || "";
  const customerName = params.get("customer") || "";

  const handleWhatsApp = () => {
    const phone = sellerWhatsapp.replace(/\s+/g, "").replace(/^\+/, "");
    const totalFormatted = totalStr
      ? `$${Number(totalStr).toLocaleString("es-CO")}`
      : "";
    const msg = encodeURIComponent(
      `Hola ${sellerName}, soy ${customerName}. Acabo de hacer un pedido${totalFormatted ? ` por ${totalFormatted}` : ""} en tu catálogo de AngeLinks. Quedo atento/a a la confirmación.`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

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

        {/* WhatsApp notification */}
        {sellerWhatsapp && (
          <button
            onClick={handleWhatsApp}
            className="w-full bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-3.5 rounded-xl transition-colors text-base flex items-center justify-center gap-2 mb-6"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Notificar a {sellerName} por WhatsApp
          </button>
        )}

        {/* Info Cards */}
        <div className="space-y-3 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-warm-200 flex items-start gap-3 text-left">
            <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
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
