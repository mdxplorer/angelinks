"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function NewCatalogPage() {
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [scraping, setScraping] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<{
    products: Array<{ name: string; price: number; image_url: string; description: string }>;
    message: string;
  } | null>(null);

  const handleScrape = async (e: FormEvent) => {
    e.preventDefault();
    if (!scrapeUrl) return;

    setScraping(true);
    setScrapeResult(null);

    try {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: scrapeUrl }),
      });
      const data = await res.json();
      setScrapeResult(data);
    } catch {
      setScrapeResult({
        products: [],
        message: "Error al intentar escanear la URL",
      });
    } finally {
      setScraping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
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
            <h1 className="font-bold text-lg">Nuevo catálogo</h1>
            <p className="text-xs text-gray-500">
              Importa productos desde una URL o agrégalos manualmente
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Import from URL */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c026d3"
                strokeWidth="2"
              >
                <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold">Importar desde URL</h2>
              <p className="text-xs text-gray-500">
                Pega el link del catálogo web y extraemos los productos
                automáticamente
              </p>
            </div>
          </div>

          <form onSubmit={handleScrape} className="flex gap-2">
            <input
              type="url"
              value={scrapeUrl}
              onChange={(e) => setScrapeUrl(e.target.value)}
              placeholder="https://ejemplo.com/catalogo"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-500 text-sm"
            />
            <button
              type="submit"
              disabled={scraping}
              className="bg-accent-600 hover:bg-accent-700 disabled:bg-gray-300 text-white font-medium px-5 py-3 rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              {scraping ? "Escaneando..." : "Escanear"}
            </button>
          </form>

          {scrapeResult && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-3">
                {scrapeResult.message}
              </p>
              {scrapeResult.products.length > 0 && (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {scrapeResult.products.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-sm"
                    >
                      {p.image_url && (
                        <img
                          src={p.image_url}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{p.name}</p>
                        <p className="text-xs text-gray-500">
                          ${p.price.toLocaleString("es-CO")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <p className="text-xs text-gray-400 mt-3">
            Funciona con catálogos HTML estándar. Para catálogos PDF o interactivos
            (como iPaper, Issuu), usa la importación manual o CSV.
          </p>
        </section>

        {/* Manual / CSV */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-100 rounded-xl flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold">Importar CSV</h2>
              <p className="text-xs text-gray-500">
                Sube un archivo CSV con tus productos
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-2">
            <p className="font-medium text-gray-700">Formato del CSV:</p>
            <code className="block bg-gray-100 p-3 rounded-lg text-xs font-mono overflow-x-auto">
              nombre,precio_catalogo,precio_venta,categoria,descripcion,imagen_url
              <br />
              &quot;Egeo Dolce EDP&quot;,149900,149900,&quot;Perfumería&quot;,&quot;Fragancia dulce 90ml&quot;,&quot;https://...&quot;
            </code>
          </div>

          <div className="mt-4 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <svg
              className="mx-auto mb-3 text-gray-400"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-sm text-gray-500">
              Arrastra tu CSV aquí o haz clic para seleccionar
            </p>
            <p className="text-xs text-gray-400 mt-1">
              .csv hasta 5MB
            </p>
          </div>
        </section>

        {/* Demo mode notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <p className="font-medium">Modo demo activo</p>
          <p className="text-xs mt-1">
            Estás en modo demo con datos de ejemplo. Para crear catálogos reales,
            conecta Supabase configurando las variables de entorno.
          </p>
        </div>
      </main>
    </div>
  );
}
